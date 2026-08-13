# New Content Notes

## Summary

- Total new pages to author: 25
- High priority: 8
- Medium priority: 12
- Low priority: 5

> Pages listed here are defined in the [Target Architecture](./02-target-architecture.md) but have **no corresponding source** in the current documentation inventory ([01-current-state-inventory.md](./01-current-state-inventory.md)). Some pages have partial fragments from existing sources; these are noted under "Partial Sources." Pages that are fully covered by existing content via move-as-is, split, or merge dispositions (per [03-migration-mapping.md](./03-migration-mapping.md)) are NOT listed here — they already have a clear content path.

---

## New Pages

### Section 1: Introduction

#### index.md
- **Priority**: High
- **Persona**: All
- **Scope**: Navigation landing page for the Introduction section. Provides a brief paragraph explaining that this section orients all readers to the ESPD concept, the procurement context, and the key actors involved. Links to all Introduction sub-pages.
- **Partial Sources**: ROOT/pages/index.adoc (rewritten from tile layout; provides structural inspiration but content is new)
- **Notes**: Although ROOT/index.adoc is mapped with disposition "rewrite" (see [Migration Mapping](./03-migration-mapping.md#module-root)), the landing page content is effectively new — the current tile layout has no reusable introductory prose. The rewrite produces new content in practice.

#### actors-and-roles.md
- **Priority**: High
- **Persona**: All
- **Scope**: Defines the key actors in the ESPD exchange: Contracting Authority (CA), Economic Operator (EO), Service Provider, and any intermediary roles. Explains who creates the Request, who completes the Response, and the role of third-party service providers in the process. Includes a simple diagram or table mapping actors to their ESPD responsibilities.
- **Partial Sources**: business/pages/business_info.adoc (brief mentions of buyer/supplier roles in lines 80–160), ESPD-EDM/README.md (actor terminology)
- **Notes**: Currently no single page defines the actors systematically. Content is scattered across business_info.adoc (buyer vs. supplier process) and technical pages (contracting party, service provider UBL elements). This page should be persona-neutral and non-technical.

#### lots-overview.md
- **Priority**: Medium
- **Persona**: All
- **Scope**: Introduces the concept of procurement lots in public procurement and explains at a high level how the ESPD supports multi-lot procedures. Covers what lots mean for the Request (CA selects criteria per lot) and the Response (EO responds per lot). Links to the detailed Technical Implementation → lots-management.md page for implementers.
- **Partial Sources**: technical/tech_request.adoc (lot management section, lines 187–244), technical/tech_response.adoc (lot management lines 1440–1451)
- **Notes**: Existing lot content is deeply technical (XML element mappings, eForms alignment). This page needs a new non-technical explanation of the business concept before pointing readers to the technical details. Write for the Procurement policy officer persona first.

#### request-response-concepts.md
- **Priority**: High
- **Persona**: All
- **Scope**: Explains the ESPD Request and ESPD Response as conceptual documents — what each one contains, how they relate to each other (Response references Request), the data flow from CA creating a Request through EO completing a Response. Covers the distinction between self-contained and regulated ESPD variants. Avoids UBL/XML technical detail.
- **Partial Sources**: technical/tech_request.adoc (business requirements section, lines 8–12), technical/tech_response.adoc (business requirements section, lines 8–21), business/pages/business_info.adoc (overview paragraphs, lines 1–60)
- **Notes**: Existing sources describe Request and Response only in deeply technical terms (XSD schemas, cardinalities) or in passing within business process text. A dedicated conceptual page at the Introduction level is new content. Critical for orienting all personas before they dive into detailed sections.

#### legal-framework.md
- **Priority**: Medium
- **Persona**: All
- **Scope**: Summarises the EU legal basis for the ESPD: Directive 2014/24/EU (Article 59), Implementing Regulation (EU) 2016/7, and the relationship to eForms Regulation. Explains the mandatory use of the ESPD in EU above-threshold procurement and notes member-state implementation latitude. Links to the full directive/regulation texts.
- **Partial Sources**: business/pages/business_info.adoc (legal references in lines 50–80, mentions directives), technical/tech_request.adoc (legal basis line ~10)
- **Notes**: Legal references are currently one-line mentions embedded in other pages. This page consolidates them into an authoritative summary. Keep language accessible — no legal jargon beyond what is necessary.

---

### Section 2: Business Guide

#### index.md
- **Priority**: High
- **Persona**: Procurement policy officer
- **Scope**: Navigation landing page for the Business Guide section. Brief paragraph explaining that this section provides non-technical guidance for contracting authorities and economic operators on using the ESPD in practice. Links to all Business Guide sub-pages.
- **Partial Sources**: business/pages/index.adoc (rewritten from tile layout)
- **Notes**: Same situation as Introduction index.md — the existing tile layout provides no reusable prose. Effectively new content.

#### espd-parts-and-criteria.md
- **Priority**: Medium
- **Persona**: Procurement policy officer
- **Scope**: Overview of the ESPD's five parts (Part I: Procedure information, Part II: EO information, Part III: Exclusion grounds, Part IV: Selection criteria, Part V: Reduction of candidates / Conclusion) and how criteria are organised across these parts. Explains which parts the CA controls in the Request and which the EO completes in the Response. Aimed at non-technical readers.
- **Partial Sources**: ESPD-EDM/criterion/README.md (part structure), espd-service-sandbox/espd-edm/parts/ directory (JSON part definitions: part-I-procedure.json, part-III-exclusion.json, etc.)
- **Notes**: No existing documentation page explains the five-part structure in a business-accessible way. Technical pages jump directly into criterion taxonomy without the conceptual overview. The JSON part definitions in espd-service-sandbox provide structural input.

#### reference-implementation-guide.md
- **Priority**: Low
- **Persona**: All
- **Scope**: Placeholder page that will link to the ESPD Service Reference Implementation documentation authored in the espd-service-sandbox repository. Describes the purpose of the reference implementation, provides links to the live deployment, and outlines what developers and business users can expect from it. Content will be authored once the reference implementation reaches stable release.
- **Partial Sources**: espd-service-sandbox/ repository (README, architecture docs once available)
- **Notes**: This is a known placeholder. Initial version should contain a brief description of the reference implementation's role plus links to the espd-service-sandbox repository. Full content authored separately. See [Reference Implementation Integration Point](#reference-implementation-integration-point) below.

---

### Section 3: Technical Implementation

#### index.md
- **Priority**: High
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Navigation landing page for the Technical Implementation section. Brief paragraph orienting developers to the implementation guides available: getting started, document model, Request and Response guides, lot management, and common concepts. Links to all sub-pages.
- **Partial Sources**: technical/pages/index.adoc (rewritten from tile layout; structural inspiration only)
- **Notes**: Current technical index is 112 lines of tile layout linking to monolithic pages. The new version links to the reorganised sub-pages and uses a different navigational structure.

#### getting-started.md
- **Priority**: High
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Quick-start guide for new implementers. Covers: what the ESPD-EDM distribution package contains, repository layout (ESPD-EDM GitHub repo structure), prerequisites for building an ESPD service, and first steps (download package, validate an example instance, understand the schemas). Acts as the entry point for all technical readers.
- **Partial Sources**: technical/tech_architecture.adoc (lines 1–45: architecture overview, distribution package context), technical/tech_dist_pack.adoc (70 lines: distribution package description), ESPD-EDM/README.md
- **Notes**: tech_architecture.adoc contributes partial content (mapped as split → getting-started.md), but the "getting started" framing — prerequisites, step-by-step first actions — is new. tech_dist_pack.adoc is mapped with disposition "rewrite" to distribution-tooling.md, not to this page; however its overview of the package structure provides useful input.

#### document-model-ubl.md
- **Priority**: Medium
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Explains the UBL 2.4 foundation underlying the ESPD-EDM: the QualificationApplicationRequest and QualificationApplicationResponse document types, how ESPD-EDM extends UBL with additional constraints, and the relationship between the UBL schemas and the ESPD Schematron rules. Provides context for understanding the element tables in Model Reference pages.
- **Partial Sources**: technical/tech_request.adoc (XSD Schema section, lines 13–24), technical/tech_response.adoc (XSD Schema section, lines 23–41), ESPD-EDM/schematron/ (schema references)
- **Notes**: UBL foundation information is currently embedded as small subsections within the monolithic Request and Response pages. A dedicated page consolidating the "why UBL" and "how ESPD-EDM uses UBL" narrative is new content. Important for implementers unfamiliar with UBL.

#### common-concepts.md
- **Priority**: Medium
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Shared technical patterns used across both ESPD Request and Response: identifier schemes (UUIDs, SchemeIDs), party structure patterns, document references and additional document references, the general Schematron validation approach, and content shared between Request/Response. Avoids duplicating patterns in both the Request and Response guides.
- **Partial Sources**: technical/tech_validation.adoc (lines 1–140: general Schematron validation approach, execution files), technical/tech_request.adoc (identifier patterns scattered throughout), technical/tech_response.adoc (common party structures)
- **Notes**: tech_validation.adoc's general validation content (split → common-concepts.md) provides partial input. The rest — identifier schemes, party patterns, document reference patterns — must be synthesised from patterns repeated across the monolithic pages. Requires careful extraction and de-duplication.

---

### Section 4: Criteria

#### index.md
- **Priority**: Medium
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Navigation landing page for the Criteria section. Brief paragraph explaining that this section covers everything about ESPD criteria: how they work, the data model, exclusion and selection categories, validation, and tooling. Links to all Criteria sub-pages.
- **Partial Sources**: None
- **Notes**: No existing page serves as a criteria section landing. Entirely new content (brief paragraph + navigation links).

#### criterion-data-model-json.md
- **Priority**: High
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Documents the `espd-edm.json` file that is the canonical source for all ESPD criterion definitions in v5. Covers: the JSON schema structure (criterion → requirement groups → requirements → properties), how to read and traverse the JSON tree, field semantics (IDs, names, descriptions, property data types, response types), versioning approach, and how implementers should consume the file programmatically (parsing guidance, rendering criterion forms, mapping responses).
- **Partial Sources**: ESPD-EDM/criterion/espd-edm.json (the source file itself), ESPD-EDM/criterion/README.md (brief format description), espd-service-sandbox/js/codelists.js (demonstrates programmatic consumption patterns)
- **Notes**: This is the most critical new-content page for v5. The JSON criterion format replaces the deprecated Excel-based `ESPD-criterion.xlsx` workflow. No existing documentation describes this format. All pages previously referencing the Excel format must redirect readers here (flagged in Migration Mapping). See also [Criterion JSON Entry](#criterion-data-model-json-entry) below.

#### reference-data.md
- **Priority**: Medium
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Documents the code lists specifically used by criteria: exclusion ground codes (ExclusionGround.gc), selection criterion codes (SelectionCriterion.gc), response data types (ResponseDataType.gc), property group types (PropertyGroupType.gc), criterion element types (CriterionElementType.gc), and boolean GUI control types (BooleanGUIControlType.gc). Explains their maintenance lifecycle and relationship to the criterion JSON structure.
- **Partial Sources**: ESPD-EDM/codelists/ directory (genericode files), technical/tech_codelist.adoc (general code list structure — but mapped to Model Reference code-lists.md, not here)
- **Notes**: The unified code-lists.md in Model Reference covers ALL code lists. This page focuses specifically on criteria-related code lists with usage context and linkage to the criterion data model. Avoids duplication by cross-referencing code-lists.md for detailed value tables.

#### distribution-tooling.md
- **Priority**: Medium
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Describes the distribution package's criterion artefacts (espd-edm.json, genericode files, Schematron files), tooling for generating or transforming criterion structures (EAtoJSON pipeline, validation tools), and integration guidance for consuming the distribution package in an ESPD implementation. Replaces the old dist_pack documentation with a criterion-tooling focus.
- **Partial Sources**: technical/tech_dist_pack.adoc (70 lines — mapped as rewrite → distribution-tooling.md), ESPD-EDM/criterion/README.md, espd-tools/EAtoJSON/ (tooling pipeline)
- **Notes**: tech_dist_pack.adoc is mapped as "rewrite" to this target, providing partial input. However, the rewrite scope is extensive: pivot from general distribution package description to criterion-focused tooling documentation reflecting the JSON workflow. Effectively new content built on a skeleton of existing material.

---

### Section 5: Model Reference

#### index.md
- **Priority**: Low
- **Persona**: Member-state developer, Commercial ESPD vendor, Technical support engineer
- **Scope**: Navigation landing page for the Model Reference section. Brief paragraph explaining that this section provides detailed data model reference material for look-up: element tables, business rules, code list catalogues, and the conceptual model. Links to all sub-pages.
- **Partial Sources**: None
- **Notes**: No existing page serves as a model reference landing. Entirely new content (brief paragraph + navigation links).

#### conceptual-model.md
- **Priority**: Medium
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Presents the ESPD Conceptual Model (maintained in Enterprise Architect): entity relationships, core concepts (Criterion, TenderingCriterionProperty, RequirementGroup, Response), and how the conceptual model maps to the UBL implementation layer. Provides or embeds the HTML export of the conceptual model diagrams.
- **Partial Sources**: espd-conceptual-model/documentation-integration/index.html (EA-exported HTML documentation), espd-conceptual-model/conceptual-model/ESPD_CM.eapx (EA project file), espd-conceptual-model/documentation-integration/README.md
- **Notes**: The conceptual model HTML export exists as an attachment/integration in the espd-conceptual-model repository. It has never been integrated as a documentation page in espd-docs. This page brings it into the documentation proper — either embedding the diagrams or providing a curated narrative with links to the full export.

#### criteria-catalogue.md
- **Priority**: Medium
- **Persona**: Member-state developer, Commercial ESPD vendor
- **Scope**: Complete catalogue of all ESPD criterion definitions with their property trees, organised by part (exclusion grounds, selection criteria). Drawn from the espd-edm.json data. Provides a navigable reference for looking up specific criteria by ID, name, or category. Cross-references the criterion-data-model-json.md page for format documentation.
- **Partial Sources**: technical/tech_common_aspects_for_criteria.adoc (lines 501–867: criterion classification tables, data structure diagrams — mapped as split → criteria-catalogue.md), ESPD-EDM/criterion/espd-edm.json
- **Notes**: The split from tech_common_aspects_for_criteria.adoc provides reference tables and taxonomy content. However, the "complete catalogue" aspect — listing all criteria from the JSON file with their property trees — is new content that builds on the split material. Requires generating or curating content from espd-edm.json.

---

### Section 6: Releases

#### index.md
- **Priority**: Low
- **Persona**: All
- **Scope**: Navigation landing page for the Releases section. Brief paragraph explaining that this section covers release history, migration guidance, and downloads for all ESPD-EDM versions. Links to current release, migration guide, and previous versions pages.
- **Partial Sources**: None
- **Notes**: No existing page serves as a releases landing. Entirely new content (brief paragraph + navigation links).

#### migration-breaking-changes.md
- **Priority**: High
- **Persona**: Member-state developer, Commercial ESPD vendor, Technical support engineer
- **Scope**: Step-by-step migration guidance from ESPD-EDM v4 to v5. Covers: breaking changes (schema changes, removed elements, renamed elements), new features requiring implementation updates (JSON criterion format, eForms lot alignment), deprecated features (Excel criterion file, demo site), and a migration checklist for implementers.
- **Partial Sources**: ROOT/pages/release_notes.adoc (mentions v5 changes at a high level), ESPD-EDM/CHANGELOG.md (detailed change log)
- **Notes**: The release notes page (mapped to current-release-v5.md) covers what changed but not how to migrate. The CHANGELOG.md provides raw change data. A structured migration guide with breaking changes, required actions, and a checklist is new content. Critical for implementers upgrading existing systems.

#### previous-versions-downloads.md
- **Priority**: Low
- **Persona**: All
- **Scope**: Links to archived documentation snapshots for ESPD-EDM v4.x and earlier, downloadable distribution packages for previous versions, and links to tagged releases on GitHub. Provides a clear path for implementers still supporting older versions.
- **Partial Sources**: ESPD-EDM GitHub releases page (external), ESPD-EDM/CHANGELOG.md (version history)
- **Notes**: No existing documentation page consolidates previous version links. Content is largely links and brief descriptions — low authoring effort but important for completeness.

---

### Section 7: Reference

#### index.md
- **Priority**: Low
- **Persona**: All
- **Scope**: Navigation landing page for the Reference section. Brief paragraph explaining that this section provides supplementary look-up material: glossary, standards references, related systems, and download links. Links to all sub-pages.
- **Partial Sources**: None
- **Notes**: No existing page serves as a reference section landing. Entirely new content (brief paragraph + navigation links).

#### standards-specifications.md
- **Priority**: Medium
- **Persona**: All
- **Scope**: Links to and brief summaries of all referenced standards and specifications: UBL 2.4 (OASIS), genericode 1.0, ISO Schematron (ISO/IEC 19757-3), EU Directive 2014/24/EU, Implementing Regulation 2016/7, eForms Regulation and SDK, and any other normative references. Serves as a quick-reference page for understanding the standards landscape the ESPD operates within.
- **Partial Sources**: technical/tech_external_resources.adoc (14 lines — mapped as move-as-is → related-systems.md, NOT this page), ESPD-EDM/README.md (mentions standards)
- **Notes**: tech_external_resources.adoc is mapped to related-systems.md (links to external EU systems). This standards page is different — it focuses on normative specifications rather than related systems. Entirely new content, though URLs and brief descriptions can be sourced from scattered references throughout existing pages.

#### repositories-downloads.md
- **Priority**: Medium
- **Persona**: All
- **Scope**: Consolidated page linking to all ESPD-EDM GitHub repositories (ESPD-EDM, espd-docs, espd-conceptual-model, espd-demo [archived], espd-service-sandbox), distribution package downloads, tooling downloads, and any other relevant artefact links. Single authoritative page for "where do I get things?"
- **Partial Sources**: technical/tech_dist_pack.adoc (distribution package links), ESPD-EDM/README.md (repo links), ROOT/pages/release_notes.adoc (download references)
- **Notes**: Download links are currently scattered. This page consolidates them. Low authoring effort — mostly curated links with brief descriptions of each resource.

---

## Reference Implementation Integration Point

The **ESPD Service Reference Implementation** documentation will be authored separately in the `espd-service-sandbox` repository. It is out of scope for the current documentation restructuring but the [Target Architecture](./02-target-architecture.md) reserves integration points for it.

### Integration Points

| Target Section | Target Page | Integration Role |
|----------------|-------------|-----------------|
| Business Guide | `using-espd-service.md` | End-user guidance on accessing and using the live ESPD Service deployment. Written for Procurement policy officers who need to create/manage ESPDs via the web UI. |
| Business Guide | `reference-implementation-guide.md` | Developer-oriented overview of the reference implementation. Links to implementation documentation, architecture decisions, and setup instructions authored in espd-service-sandbox. |

### Current Status

- The `espd-service-sandbox` repository contains a working reference implementation with criterion JSON integration, code list rendering, and form generation.
- Documentation within that repository is not yet structured for integration into the main ESPD-EDM documentation site.
- Once the reference implementation reaches stable release, its documentation will be authored to fit the target architecture integration points.

### What to Do Now

1. Create `using-espd-service.md` and `reference-implementation-guide.md` as placeholder pages with:
   - A brief description of the reference implementation's purpose
   - A link to the `espd-service-sandbox` repository
   - A note that full content will be added upon stable release
2. Ensure all deprecated ESPD Demo references (flagged in [Migration Mapping — Demo Site References](./03-migration-mapping.md#demo-site-references)) are replaced with references to the reference implementation or removed entirely.
3. Do NOT migrate any content from the deprecated `espd-demo` repository into these pages.

---

## Criterion Data Model JSON Entry

The `criterion-data-model-json.md` page (listed under [Section 4: Criteria](#criterion-data-model-jsonmd) above) is the single most important new-content page for the ESPD-EDM v5 documentation. This section provides additional authoring guidance.

### Why This Page is Critical

- **Format transition**: ESPD-EDM v5 replaces the Excel-based criterion definitions (`ESPD-criterion.xlsx`) with a JSON file (`espd-edm.json`). All implementers must understand the new format.
- **No existing documentation**: The JSON format has a brief README in `ESPD-EDM/criterion/README.md` but no structured documentation explaining the schema, traversal patterns, or consumption guidance.
- **Migration dependency**: Multiple pages in the Migration Mapping are flagged as requiring updates from Excel-based to JSON-based workflow references. This page is the target for those redirections.

### Suggested Content Structure

1. **Overview** — What is `espd-edm.json` and why it replaced the Excel format
2. **Schema structure** — Top-level organisation (criterion array), criterion object fields, requirement group nesting, property definitions
3. **Field reference** — Table of all fields with types, descriptions, and example values
4. **Traversal patterns** — How to walk the criterion tree (criterion → requirement groups → requirements/questions → properties)
5. **Response mapping** — How criterion properties map to response data types (ResponseDataType code list)
6. **Consumption guidance** — Parsing the file, rendering criterion forms, generating ESPD instances from it
7. **Versioning** — How the JSON file evolves across releases, backward compatibility notes

### Source Material

| Source | What It Provides |
|--------|-----------------|
| `ESPD-EDM/criterion/espd-edm.json` | The canonical JSON file (structure, field names, actual data) |
| `ESPD-EDM/criterion/README.md` | Brief description of the format and its purpose |
| `espd-service-sandbox/js/codelists.js` | Example of programmatic consumption (code list loading patterns) |
| `espd-service-sandbox/espd-edm/parts/` | Part-organised criterion JSON subsets (demonstrates the part structure) |
| `espd-tools/EAtoJSON/` | The generation pipeline (EA model → JSON) — documents the authoritative source |
| `ESPD-EDM/codelists/ResponseDataType.gc` | Response data type code list used by criterion properties |
| `ESPD-EDM/codelists/CriterionElementType.gc` | Criterion element type code list (CRITERION, REQUIREMENT_GROUP, etc.) |
| `ESPD-EDM/codelists/PropertyGroupType.gc` | Property group type code list (ONTRUE, ONFALSE, etc.) |
