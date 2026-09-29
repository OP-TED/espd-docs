#!/usr/bin/env node
'use strict';

/**
 * External link checker for the ESPD documentation.
 *
 * Scans the AsciiDoc sources (the source of truth) for external http(s) URLs,
 * deduplicates them, checks each one's reachability, and writes a CSV report.
 *
 * It does NOT read external-urls.csv or broken-links-report.csv; those are
 * treated as untrusted artefacts. URLs are extracted straight from the .adoc
 * content so the report always reflects what is actually published.
 *
 * Proxy support: honours http_proxy/https_proxy (and upper-case variants) plus
 * no_proxy for host bypass. This is implemented with Node's http/https modules
 * because Node's global fetch (undici) ignores these environment variables.
 *
 * Usage:
 *   node scripts/check-external-links.js [options]
 *
 * Options:
 *   --docs-dir <path>     Directory to scan for .adoc files (default: ../modules relative to this script)
 *   --out <path>          Output CSV path (default: ../external-links-report.csv relative to this script)
 *   --concurrency <n>     Number of parallel requests (default: 8)
 *   --timeout <ms>        Per-request timeout in milliseconds (default: 15000)
 *   --fail-on-broken      Exit with code 1 if any broken link is found
 *   --help                Show this help text
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const net = require('net');
const tls = require('tls');
const { URL } = require('url');

function parseArgs(argv) {
  const scriptDir = __dirname;
  const opts = {
    docsDir: path.resolve(scriptDir, '..', 'modules'),
    out: path.resolve(scriptDir, '..', 'external-links-report.csv'),
    concurrency: 8,
    timeout: 15000,
    failOnBroken: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case '--docs-dir':
        opts.docsDir = path.resolve(argv[++i]);
        break;
      case '--out':
        opts.out = path.resolve(argv[++i]);
        break;
      case '--concurrency':
        opts.concurrency = Math.max(1, parseInt(argv[++i], 10) || 8);
        break;
      case '--timeout':
        opts.timeout = Math.max(1000, parseInt(argv[++i], 10) || 15000);
        break;
      case '--fail-on-broken':
        opts.failOnBroken = true;
        break;
      case '--help':
      case '-h':
        opts.help = true;
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        opts.help = true;
    }
  }
  return opts;
}

const HELP = `External link checker for the ESPD documentation.

Usage:
  node scripts/check-external-links.js [options]

Options:
  --docs-dir <path>     Directory to scan for .adoc files (default: ../modules)
  --out <path>          Output CSV path (default: ../external-links-report.csv)
  --concurrency <n>     Number of parallel requests (default: 8)
  --timeout <ms>        Per-request timeout in ms (default: 15000)
  --fail-on-broken      Exit with code 1 if any broken link is found
  --help                Show this help text

Proxy: honours http_proxy / https_proxy (and upper-case variants) and no_proxy.
`;

// ---------------------------------------------------------------------------
// Proxy handling
//
// Node's global fetch (undici) does NOT read http_proxy/https_proxy from the
// environment, so this checker uses Node's built-in http/https modules and
// implements proxy support explicitly, mirroring how gulpfile.js picks up the
// proxy vars. Both lower- and upper-case variants are honoured, along with
// no_proxy for host bypass.
// ---------------------------------------------------------------------------

function envValue(...names) {
  for (const name of names) {
    if (process.env[name]) return process.env[name];
  }
  return undefined;
}

const PROXY_CONFIG = {
  http: envValue('http_proxy', 'HTTP_PROXY'),
  https: envValue('https_proxy', 'HTTPS_PROXY'),
  no: envValue('no_proxy', 'NO_PROXY'),
};

/** Parse a NO_PROXY list into normalised suffix rules. */
function parseNoProxy(noProxy) {
  if (!noProxy) return [];
  return noProxy
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

const NO_PROXY_RULES = parseNoProxy(PROXY_CONFIG.no);

/** True if a hostname should bypass the proxy according to NO_PROXY. */
function shouldBypassProxy(hostname) {
  if (NO_PROXY_RULES.length === 0) return false;
  const host = hostname.toLowerCase();
  for (const rule of NO_PROXY_RULES) {
    if (rule === '*') return true;
    const bare = rule.startsWith('.') ? rule.slice(1) : rule;
    if (host === bare || host.endsWith('.' + bare)) return true;
  }
  return false;
}

/** Return the proxy URL to use for a target URL, or undefined for a direct connection. */
function proxyForUrl(target) {
  const isHttps = target.protocol === 'https:';
  const proxy = isHttps ? PROXY_CONFIG.https : PROXY_CONFIG.http;
  if (!proxy) return undefined;
  if (shouldBypassProxy(target.hostname)) return undefined;
  return new URL(proxy);
}

/** Establish a CONNECT tunnel through an HTTP proxy for an https target. */
function connectViaProxy(proxyUrl, target, timeout) {
  return new Promise((resolve, reject) => {
    const proxyPort = proxyUrl.port || (proxyUrl.protocol === 'https:' ? 443 : 80);
    const targetPort = target.port || 443;

    const headers = [`CONNECT ${target.hostname}:${targetPort} HTTP/1.1`, `Host: ${target.hostname}:${targetPort}`];
    if (proxyUrl.username) {
      const auth = Buffer.from(
        `${decodeURIComponent(proxyUrl.username)}:${decodeURIComponent(proxyUrl.password || '')}`
      ).toString('base64');
      headers.push(`Proxy-Authorization: Basic ${auth}`);
    }
    headers.push('Connection: keep-alive', '', '');

    const connector = proxyUrl.protocol === 'https:' ? tls : net;
    const socket = connector.connect(
      proxyUrl.protocol === 'https:'
        ? { host: proxyUrl.hostname, port: proxyPort, servername: proxyUrl.hostname }
        : { host: proxyUrl.hostname, port: proxyPort }
    );

    const onError = (err) => {
      socket.destroy();
      reject(err);
    };
    const timer = setTimeout(() => onError(new Error(`Proxy CONNECT timeout after ${timeout}ms`)), timeout);

    socket.once('error', (err) => {
      clearTimeout(timer);
      onError(err);
    });

    socket.on('connect', () => socket.write(headers.join('\r\n')));

    let responseBuffer = '';
    const onData = (chunk) => {
      responseBuffer += chunk.toString('binary');
      const headerEnd = responseBuffer.indexOf('\r\n\r\n');
      if (headerEnd === -1) return;
      socket.removeListener('data', onData);
      clearTimeout(timer);
      const statusLine = responseBuffer.split('\r\n')[0] || '';
      const statusMatch = statusLine.match(/^HTTP\/\d\.\d\s+(\d{3})/);
      const status = statusMatch ? parseInt(statusMatch[1], 10) : 0;
      if (status !== 200) {
        onError(new Error(`Proxy CONNECT failed: ${statusLine.trim() || 'no status'}`));
        return;
      }
      resolve(socket);
    };
    socket.on('data', onData);
  });
}

/** Recursively collect .adoc files under a directory. */
function collectAdocFiles(dir) {
  const results = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`Cannot read directory ${dir}: ${err.message}`);
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectAdocFiles(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.adoc')) {
      results.push(full);
    }
  }
  return results;
}

// Matches http/https URLs. Stops at whitespace and common AsciiDoc delimiters
// that terminate a URL (closing bracket of a macro, quotes, etc.).
const URL_REGEX = /https?:\/\/[^\s\[\]<>"'`|)]+/g;

// Hosts whose URLs are generated artefacts (rendered diagrams, data URIs),
// not editorial hyperlinks worth reachability-checking. These bloat the report
// and are not "links" a reader would follow.
const SKIP_HOSTS = new Set(['kroki.io', 'niolesk.top']);

/** True if the URL is a diagram/generator source rather than an editorial link. */
function isGeneratedAsset(url) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return SKIP_HOSTS.has(host);
  } catch (err) {
    return false;
  }
}

/** Trim trailing punctuation that is usually not part of the URL. */
function cleanUrl(raw) {
  let url = raw;
  // Strip trailing punctuation commonly attached in prose.
  while (url.length > 0 && '.,;:'.includes(url[url.length - 1])) {
    url = url.slice(0, -1);
  }
  return url;
}

/** Extract external URLs from all adoc files, mapped to their source locations. */
function extractUrls(files, rootForRelative) {
  const urlToLocations = new Map();
  for (const file of files) {
    let content;
    try {
      content = fs.readFileSync(file, 'utf8');
    } catch (err) {
      console.error(`Skipping unreadable file ${file}: ${err.message}`);
      continue;
    }
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => {
      const matches = line.match(URL_REGEX);
      if (!matches) return;
      for (const m of matches) {
        const url = cleanUrl(m);
        if (!url) continue;
        if (isGeneratedAsset(url)) continue;
        const rel = path.relative(rootForRelative, file).split(path.sep).join('/');
        const loc = `${rel}:${idx + 1}`;
        if (!urlToLocations.has(url)) urlToLocations.set(url, new Set());
        urlToLocations.get(url).add(loc);
      }
    });
  }
  return urlToLocations;
}

const COMMON_HEADERS = {
  // A UA reduces spurious 403s from servers that block empty UAs.
  'User-Agent': 'espd-docs-link-checker/1.0 (+https://github.com/OP-TED/espd-docs)',
  Accept: '*/*',
};

/** Perform a reachability check, following redirects manually. */
async function checkUrl(url, timeout) {
  const MAX_REDIRECTS = 5;

  const attempt = async (method) => {
    let current = url;
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const res = await requestWithRedirectInfo(current, method, timeout);
      if (res.status >= 300 && res.status < 400 && res.location) {
        current = new URL(res.location, current).href;
        continue;
      }
      return res;
    }
    return { status: 310, statusText: 'Too many redirects' };
  };

  try {
    // Prefer HEAD (cheap); some servers reject it, so fall back to GET.
    let res = await attempt('HEAD');
    if (res.status === 405 || res.status === 403 || res.status === 501 || res.status === 400) {
      res = await attempt('GET');
    }
    const ok = res.status >= 200 && res.status < 400;
    return {
      url,
      status: res.status,
      ok,
      reason: ok ? 'OK' : `HTTP ${res.status} ${res.statusText || ''}`.trim(),
    };
  } catch (err) {
    const reason = /Timeout after/.test(err.message)
      ? err.message
      : `Request failed: ${err.code || err.message}`;
    return { url, status: '', ok: false, reason };
  }
}

/** Like request(), but also surfaces the Location header for redirect handling. */
function requestWithRedirectInfo(rawUrl, method, timeout) {
  return new Promise((resolve, reject) => {
    let target;
    try {
      target = new URL(rawUrl);
    } catch (err) {
      reject(new Error(`Invalid URL: ${err.message}`));
      return;
    }
    const isHttps = target.protocol === 'https:';
    const proxyUrl = proxyForUrl(target);

    const finish = (req) => {
      let settled = false;
      req.on('response', (res) => {
        if (settled) return;
        settled = true;
        res.resume();
        resolve({ status: res.statusCode, statusText: res.statusMessage || '', location: res.headers.location });
        req.destroy();
      });
      req.on('error', (err) => {
        if (settled) return;
        settled = true;
        reject(err);
      });
      req.setTimeout(timeout, () => {
        if (settled) return;
        settled = true;
        req.destroy();
        reject(new Error(`Timeout after ${timeout}ms`));
      });
      req.end();
    };

    if (proxyUrl && !isHttps) {
      const options = {
        host: proxyUrl.hostname,
        port: proxyUrl.port || 80,
        method,
        path: target.href,
        headers: { ...COMMON_HEADERS, Host: target.host },
      };
      if (proxyUrl.username) {
        const auth = Buffer.from(
          `${decodeURIComponent(proxyUrl.username)}:${decodeURIComponent(proxyUrl.password || '')}`
        ).toString('base64');
        options.headers['Proxy-Authorization'] = `Basic ${auth}`;
      }
      finish(http.request(options));
      return;
    }

    if (proxyUrl && isHttps) {
      connectViaProxy(proxyUrl, target, timeout)
        .then((socket) => {
          finish(
            https.request({
              method,
              path: target.pathname + target.search,
              headers: { ...COMMON_HEADERS, Host: target.host },
              socket,
              agent: false,
              servername: target.hostname,
            })
          );
        })
        .catch(reject);
      return;
    }

    const client = isHttps ? https : http;
    finish(
      client.request({
        method,
        path: target.pathname + target.search,
        host: target.hostname,
        port: target.port || (isHttps ? 443 : 80),
        headers: { ...COMMON_HEADERS, Host: target.host },
      })
    );
  });
}

/** Run checks with bounded concurrency. */
async function runChecks(urls, concurrency, timeout) {
  const results = new Map();
  let index = 0;
  let done = 0;
  const total = urls.length;

  async function worker() {
    while (index < urls.length) {
      const current = urls[index++];
      const result = await checkUrl(current, timeout);
      results.set(current, result);
      done++;
      const state = result.ok ? 'OK ' : 'BAD';
      process.stderr.write(`[${done}/${total}] ${state} ${result.status || '-'} ${current}\n`);
    }
  }

  const workers = [];
  for (let i = 0; i < Math.min(concurrency, urls.length); i++) {
    workers.push(worker());
  }
  await Promise.all(workers);
  return results;
}

/** Escape a value for CSV (RFC 4180 style). */
function csvField(value) {
  const s = String(value == null ? '' : value);
  if (/[",\r\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function writeReport(outPath, rows) {
  const header = ['URL', 'Status', 'Result', 'Reason', 'Occurrences', 'Locations'];
  const lines = [header.map(csvField).join(',')];
  for (const row of rows) {
    lines.push(
      [
        row.url,
        row.status,
        row.ok ? 'OK' : 'BROKEN',
        row.reason,
        row.occurrences,
        row.locations,
      ]
        .map(csvField)
        .join(',')
    );
  }
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    process.stdout.write(HELP);
    return 0;
  }

  if (PROXY_CONFIG.http || PROXY_CONFIG.https) {
    const redact = (u) => {
      try {
        const p = new URL(u);
        if (p.password) p.password = '***';
        return p.href;
      } catch (e) {
        return u;
      }
    };
    console.error(
      `Using proxy — http: ${PROXY_CONFIG.http ? redact(PROXY_CONFIG.http) : '(none)'}, ` +
        `https: ${PROXY_CONFIG.https ? redact(PROXY_CONFIG.https) : '(none)'}` +
        (PROXY_CONFIG.no ? `, no_proxy: ${PROXY_CONFIG.no}` : '')
    );
  } else {
    console.error('No http_proxy/https_proxy detected in environment; connecting directly.');
  }

  console.error(`Scanning .adoc files under: ${opts.docsDir}`);
  const files = collectAdocFiles(opts.docsDir);
  console.error(`Found ${files.length} .adoc file(s).`);

  const urlToLocations = extractUrls(files, opts.docsDir);
  const urls = [...urlToLocations.keys()].sort();
  console.error(`Found ${urls.length} unique external URL(s). Checking...`);

  if (urls.length === 0) {
    writeReport(opts.out, []);
    console.error(`No external URLs found. Empty report written to ${opts.out}`);
    return 0;
  }

  const results = await runChecks(urls, opts.concurrency, opts.timeout);

  const rows = urls.map((url) => {
    const r = results.get(url);
    const locations = [...urlToLocations.get(url)].sort();
    return {
      url,
      status: r.status,
      ok: r.ok,
      reason: r.reason,
      occurrences: locations.length,
      locations: locations.join(' | '),
    };
  });

  // Broken links first, then alphabetical.
  rows.sort((a, b) => {
    if (a.ok !== b.ok) return a.ok ? 1 : -1;
    return a.url.localeCompare(b.url);
  });

  writeReport(opts.out, rows);

  const broken = rows.filter((r) => !r.ok);
  console.error('');
  console.error(`Checked ${rows.length} URL(s): ${rows.length - broken.length} OK, ${broken.length} broken.`);
  console.error(`Report written to ${opts.out}`);
  if (broken.length > 0) {
    console.error('Broken links:');
    for (const r of broken) {
      console.error(`  ${r.status || '-'}  ${r.url}  (${r.reason})`);
    }
  }

  return opts.failOnBroken && broken.length > 0 ? 1 : 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(`Unexpected error: ${err && err.stack ? err.stack : err}`);
    process.exit(2);
  });
