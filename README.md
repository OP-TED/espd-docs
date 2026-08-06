# Documentation for ESPD-EDM

This repository is the source for the human-readable [ESPD-EDM documentation published on TED Developer Docs](https://docs.ted.europa.eu/ESPD-EDM/latest/index.html). It contains the Antora-based content modules (business and technical) that are built and published to the TED documentation site.

Versioned technical release artefacts (XML schemas, criteria definitions, code lists, validation rules) are maintained in the [OP-TED/ESPD-EDM](https://github.com/OP-TED/ESPD-EDM) repository.

An acceptance testing version of the documentation is available at: https://docs.acceptance.ted.europa.eu/ESPD-EDM/latest/index.html

For guidance on content ownership, authoring practices, and the relationship between these repositories, see [DOCUMENTATION_GUIDELINES.md](DOCUMENTATION_GUIDELINES.md).

## Workspace Setup

### VSCode installation

1. Install "Visual Studio Code" from EC Store.
2. Start "Visual Store Code [V5]" (if it is already running, restart it).

From within VSCode:

1. Configure proxy for VS Code and terminal:
   1. Open "View > Command Palette..." and select "Preferences: Open Settings (JSON)".
   2. Add or edit (if they already exist) the following lines, replacing values between "<" and ">":

      ```json
      "http.proxy": "http://<username:<password>@<proxy_host>:<proxy_port>",
      "terminal.integrated.env.windows": {
        "http_proxy": "http://<username:<password>@<proxy_host>:<proxy_port>",
        "https_proxy": "http://<username:<password>@<proxy_host>:<proxy_port>"
      }
      ```

> **NOTE**: When editing "settings.json", make sure that the resulting JSON is valid by fixing any warnings/errors that might appear.
