# Current-State Inventory

## Summary

- Total page files: 29
- Published pages: 28
- Partial/include files: 1
- Commented-out nav entries: 3 (unique, each duplicated across all 3 nav files)

## Module: ROOT

| # | File Path | Page Title | Type | Lines | In Nav |
|---|-----------|-----------|------|-------|--------|
| 1 | pages/index.adoc | ESPD Exchange Data Model (ESPD-EDM) | page | 34 | ✓ |
| 2 | pages/release_notes.adoc | Release Notes | page | 80 | ✓ |
| 3 | pages/demo.adoc | ESPD Demo Development Tools | page | 80 | ✓ |
| 4 | pages/home.adoc | ESPD Version 4.0.x | page | 35 | ✗ |

## Module: business

| # | File Path | Page Title | Type | Lines | In Nav |
|---|-----------|-----------|------|-------|--------|
| 1 | pages/index.adoc | ESPD Documentation for Business users | page | 69 | ✓ |
| 2 | pages/implementation.adoc | An ESPD Implementation | page | 29 | ✓ |
| 3 | pages/using.adoc | How to use the ESPD | page | 37 | ✓ |
| 4 | pages/business_info.adoc | The European Single Procurement Document | page | 240 | ✗ |
| 5 | pages/espd_form.adoc | Filling in the ESPD online form | page | 157 | ✗ |

## Module: technical

| # | File Path | Page Title | Type | Lines | In Nav |
|---|-----------|-----------|------|-------|--------|
| 1 | pages/index.adoc | ESPD Documentation for Technical Implementers | page | 112 | ✓ |
| 2 | pages/tech_rules_reference.adoc | Business Rules Reference | page | 47 | ✓ |
| 3 | pages/tech_dist_pack.adoc | The Distribution Package | page | 70 | ✗ |
| 4 | pages/tech_architecture.adoc | ESPD Architecture and Procurement Procedure Steps | page | 87 | ✗ |
| 5 | pages/tech_request.adoc | The ESPD Request Document | page | 731 | ✗ |
| 6 | pages/tech_common_aspects_for_criteria.adoc | Common Aspects for Criteria | page | 867 | ✗ |
| 7 | pages/tech_exclusion_criteria.adoc | Exclusion grounds | page | 430 | ✗ |
| 8 | pages/tech_selection_criteria.adoc | Selection criteria | page | 973 | ✗ |
| 9 | pages/tech_response.adoc | The ESPD Response Document | page | 1450 | ✗ |
| 10 | pages/tech_validation.adoc | Validation | page | 250 | ✗ |
| 11 | pages/tech_codelist.adoc | Code List Catalogue | page | 701 | ✗ |
| 12 | pages/tech_busrules.adoc | Business Rules | page | 75 | ✗ |
| 13 | pages/tech_glossary.adoc | Glossary | page | 145 | ✗ |
| 14 | pages/bus_codelist.adoc | Codelists Overview | page | 56 | ✗ |
| 15 | pages/tech_br_espd_profile.adoc | Business Interoperability Interfaces — Profile BII41 — ESPD | page | 2740 | ✗ |
| 16 | pages/tech_br_request_reqs.adoc | Contracting Body Requirements | page | 148 | ✗ |
| 17 | pages/tech_br_response_reqs.adoc | Economic Operator Requirements | page | 135 | ✗ |
| 18 | pages/tech_codelist_examples.adoc | XML Code List Examples | page | 394 | ✗ |
| 19 | pages/tech_external_resources.adoc | External Resources | page | 14 | ✗ |

## Partials (include files)

| # | Module | File Path | Included By |
|---|--------|-----------|-------------|
| 1 | business | pages/_creating.adoc | None (orphaned — not included by any file) |

## Commented-Out Navigation Entries

All three nav files (ROOT, business, technical) share the same global navigation structure and contain identical commented-out entries.

| Module | Nav File | Entry | Notes |
|--------|----------|-------|-------|
| ROOT | modules/ROOT/nav.adoc | `xref:espd-bus::creating.adoc[Creating an ESPD Service]` | Uses old component prefix `espd-bus`; `_creating.adoc` partial exists in business module |
| ROOT | modules/ROOT/nav.adoc | `xref:espd-bus::overview_upgrades.adoc[Overview for Upgrading your Version]` | Uses old component prefix `espd-bus`; file does not exist |
| ROOT | modules/ROOT/nav.adoc | `xref:espd-tech::demo.adoc[Demo ESPD Service Online]` | Uses old component prefix `espd-tech`; file does not exist |
| business | modules/business/nav.adoc | `xref:espd-bus::creating.adoc[Creating an ESPD Service]` | Duplicate of ROOT entry |
| business | modules/business/nav.adoc | `xref:espd-bus::overview_upgrades.adoc[Overview for Upgrading your Version]` | Duplicate of ROOT entry |
| business | modules/business/nav.adoc | `xref:espd-tech::demo.adoc[Demo ESPD Service Online]` | Duplicate of ROOT entry |
| technical | modules/technical/nav.adoc | `xref:espd-bus::creating.adoc[Creating an ESPD Service]` | Duplicate of ROOT entry |
| technical | modules/technical/nav.adoc | `xref:espd-bus::overview_upgrades.adoc[Overview for Upgrading your Version]` | Duplicate of ROOT entry |
| technical | modules/technical/nav.adoc | `xref:espd-tech::demo.adoc[Demo ESPD Service Online]` | Duplicate of ROOT entry |

### Notes on Navigation Structure

- All three modules use the same shared global nav structure (shared sidebar), resulting in the same entries appearing in all three `nav.adoc` files.
- The business and technical nav files reference `business:service.adoc` (title "What is an ESPD Service?"), but this file **does not exist** in the repository. This appears to be an alias or broken reference — the actual content is in `business:business_info.adoc`.
- Pages not listed in `nav.adoc` files (marked ✗) are still reachable via tile links on their module's `index.adoc` landing page.
- Technical pages numbered 3–19 are all linked from the `technical/index.adoc` tile layout but not from any `nav.adoc` file directly.
