# Target Architecture

## Page Hierarchy Tree

```
ESPD-EDM Documentation
├── 1. Introduction/
│   ├── index.adoc                      [landing]
│   ├── what-is-espd.adoc
│   ├── procurement-process.adoc
│   ├── request-response-concepts.adoc
│   ├── actors-and-roles.adoc
│   ├── lots-overview.adoc
│   └── legal-framework.adoc
│
├── 2. Business Guide/
│   ├── index.adoc                      [landing]
│   ├── for-contracting-authorities.adoc
│   ├── for-economic-operators.adoc
│   ├── espd-parts.adoc
│   ├── using-espd-service.adoc
│   └── reference-implementation-guide.adoc  [placeholder]
│
├── 3. Technical Implementation/
│   ├── index.adoc                      [landing]
│   ├── getting-started.adoc
│   ├── document-model-ubl.adoc
│   ├── common-concepts.adoc
│   ├── espd-request.adoc
│   ├── espd-response.adoc
│   └── lots-management.adoc
│
├── 4. Criteria/
│   ├── index.adoc                      [landing]
│   ├── how-criteria-work.adoc
│   ├── criterion-data-model-json.adoc
│   ├── exclusion-grounds.adoc
│   ├── selection-criteria.adoc
│   ├── validation-conformance.adoc
│   ├── reference-data.adoc
│   └── distribution-tooling.adoc
│
├── 5. Model Reference/
│   ├── index.adoc                      [landing]
│   ├── conceptual-model.adoc
│   ├── request-model-reference.adoc
│   ├── response-model-reference.adoc
│   ├── criteria-catalogue.adoc
│   ├── code-lists.adoc
│   └── business-rules.adoc
│
├── 6. Releases/
│   ├── index.adoc                      [landing]
│   ├── current-release-v5.adoc
│   ├── migration-breaking-changes.adoc
│   └── previous-versions-downloads.adoc
│
└── 7. Further Information/
    ├── index.adoc                      [landing]
    ├── glossary.adoc
    ├── standards-specifications.adoc
    ├── related-systems.adoc
    └── repositories-downloads.adoc
```

## Design Principles

- **Goal-oriented organisation** — Content is structured around what users need to accomplish (understand ESPD, implement a service, look up a data model element) rather than around internal repository modules or document artefacts.
- **Maximum two navigation levels** — Each of the seven sections contains flat sub-pages; no page is nested more than two levels below the site root (Section → Page).
- **Landing pages are navigation-only** — Every section's `index.adoc` provides a brief introductory paragraph and links to its sub-pages. Substantive content lives on dedicated content pages.
- **Guide / how-to / reference separated** — Explanatory guides (Introduction, Business Guide), task-oriented how-tos (Technical Implementation, Criteria), and look-up reference material (Model Reference, Reference) are kept in distinct sections so readers can find the appropriate content type quickly.

## Personas

| Persona | Primary Sections | Description |
|---------|-----------------|-------------|
| Member State developer | Technical Implementation, Criteria, Model Reference | Builds ESPD services integrated into national e-procurement platforms |
| Commercial ESPD vendor | Technical Implementation, Criteria, Model Reference | Develops commercial ESPD software products for multiple buyers/operators |
| Procurement policy officer | Introduction, Business Guide | Needs to understand the ESPD in the procurement lifecycle without technical depth |
| Technical support engineer | Model Reference, Further Information, Releases | Troubleshoots ESPD implementations, validates instances, checks version changes |

---

## Section 1: Introduction

| Page | Title | Scope | Type | Persona(s) |
|------|-------|-------|------|------------|
| index.adoc | Introduction | Landing page linking to all introductory topics | navigation | All |
| what-is-espd.adoc | What is the ESPD? | Explains the European Single Procurement Document, its two-part structure (Request + Response), and its role in pre-qualification | content | All |
| procurement-process.adoc | The Procurement Process | Outlines the EU public procurement lifecycle and where the ESPD fits within it | content | All |
| request-response-concepts.adoc | Request & Response Concepts | Describes the ESPD Request and ESPD Response documents at a conceptual level, their relationship, and data flow | content | All |
| actors-and-roles.adoc | Actors and Roles | Defines the Contracting Authority, Economic Operator, Service Provider, and other actors involved in the ESPD exchange | content | All |
| lots-overview.adoc | Lots Overview | Introduces the concept of procurement lots and how the ESPD handles multi-lot procedures | content | All |
| legal-framework.adoc | Legal Framework | Summarises Directive 2014/24/EU (Article 59), Regulation (EU) 2016/7, and eForms alignment | content | All |


## Section 2: Business Guide

| Page | Title | Scope | Type | Persona(s) |
|------|-------|-------|------|------------|
| index.adoc | Business Guide | Landing page linking to business-oriented guidance topics | navigation | Procurement policy officer |
| for-contracting-authorities.adoc | For Contracting Authorities | Guidance for buyers on preparing ESPD Requests, selecting criteria, and evaluating responses | content | Procurement policy officer |
| for-economic-operators.adoc | For Economic Operators | Guidance for suppliers on completing the ESPD Response, providing evidence, and handling multi-lot bids | content | Procurement policy officer |
| espd-parts.adoc | ESPD Parts | Overview of the ESPD's five parts (procedure info, exclusion, selection, reduction, conclusion) and how criteria map to them | content | Procurement policy officer |
| using-espd-service.adoc | Using the ESPD Service | How to access and use the ESPD Service reference implementation for creating and managing ESPDs | content | Procurement policy officer |
| reference-implementation-guide.adoc | Reference Implementation Guide | Placeholder for the ESPD Service reference implementation overview, linking to live deployment and documentation authored in espd-service-sandbox | content | All |

## Section 3: Technical Implementation

| Page | Title | Scope | Type | Persona(s) |
|------|-------|-------|------|------------|
| index.adoc | Technical Implementation | Landing page linking to implementation-oriented content for developers | navigation | Member State developer, Commercial ESPD vendor |
| getting-started.adoc | Getting Started | Quick-start guide covering the distribution package contents, repository structure, and first steps for implementers | content | Member State developer, Commercial ESPD vendor |
| document-model-ubl.adoc | Document Model (UBL) | Explains the UBL 2.4 foundation, QualificationApplicationRequest and QualificationApplicationResponse schemas, and how ESPD-EDM extends UBL | content | Member State developer, Commercial ESPD vendor |
| common-concepts.adoc | Common Concepts | Shared technical patterns: identifiers, party structures, document references, additional document references, and Schematron validation approach | content | Member State developer, Commercial ESPD vendor |
| espd-request.adoc | ESPD Request | Technical guide to the ESPD Request document: business requirements, XSD schema overview, cardinality constraints, root elements, contracting party, service provider, and procurement project | content | Member State developer, Commercial ESPD vendor |
| espd-response.adoc | ESPD Response | Technical guide to the ESPD Response document: business requirements, XSD schema overview, cardinality constraints, EO party, criterion responses, evidence, and XML examples | content | Member State developer, Commercial ESPD vendor |
| lots-management.adoc | Lots Management | Detailed treatment of lot management in both Request and Response, eForms alignment, and multi-lot response patterns | content | Member State developer, Commercial ESPD vendor |

## Section 4: Criteria

| Page | Title | Scope | Type | Persona(s) |
|------|-------|-------|------|------------|
| index.adoc | Criteria | Landing page linking to all criteria-related documentation | navigation | Member State developer, Commercial ESPD vendor |
| how-criteria-work.adoc | How Criteria Work | Explains the criterion–property–response chain, property group types, requirement/question distinction, and how responses link to criterion properties | content | Member State developer, Commercial ESPD vendor |
| criterion-data-model-json.adoc | Criterion Data Model (JSON) | Documents the `espd-edm.json` structure, its schema, and how implementers should consume and render criterion definitions (replaces deprecated Excel format) | content | Member State developer, Commercial ESPD vendor |
| exclusion-grounds.adoc | Exclusion Grounds | Covers all exclusion criteria categories (criminal convictions, taxes, environmental/social/labour law, etc.) with data structures and response patterns | content | Member State developer, Commercial ESPD vendor |
| selection-criteria.adoc | Selection Criteria | Covers selection criteria categories (suitability, economic/financial standing, technical/professional ability) with data structures and response patterns | content | Member State developer, Commercial ESPD vendor |
| validation-conformance.adoc | Validation and Conformance | Schematron rules, CVA constraints, and conformance testing for criterion-related content in ESPD instances | content | Member State developer, Commercial ESPD vendor, Technical support engineer |
| reference-data.adoc | Reference Data | Code lists used by criteria (exclusion ground codes, selection criterion codes, response data types, property group types) and their maintenance | content | Member State developer, Commercial ESPD vendor |
| distribution-tooling.adoc | Distribution and Tooling | The distribution package criterion artefacts, tooling for generating criterion structures, and integration guidance | content | Member State developer, Commercial ESPD vendor |

## Section 5: Model Reference

| Page | Title | Scope | Type | Persona(s) |
|------|-------|-------|------|------------|
| index.adoc | Model Reference | Landing page linking to detailed data model reference material | navigation | Member State developer, Commercial ESPD vendor, Technical support engineer |
| conceptual-model.adoc | Conceptual Model | The ESPD Conceptual Model (from EA), entity relationships, and how the conceptual model maps to the UBL implementation | content | Member State developer, Commercial ESPD vendor |
| request-model-reference.adoc | Request Model Reference | Detailed element-by-element reference tables for the ESPD Request document (cardinalities, data types, business rules per element) | content | Member State developer, Commercial ESPD vendor, Technical support engineer |
| response-model-reference.adoc | Response Model Reference | Detailed element-by-element reference tables for the ESPD Response document (cardinalities, data types, business rules per element) | content | Member State developer, Commercial ESPD vendor, Technical support engineer |
| criteria-catalogue.adoc | Criteria Catalogue | Complete catalogue of all criterion definitions with their property trees, drawn from espd-edm.json | content | Member State developer, Commercial ESPD vendor |
| code-lists.adoc | Code Lists | Full reference for all ESPD code lists (genericode files), their values, and usage contexts | content | Member State developer, Commercial ESPD vendor, Technical support engineer |
| business-rules.adoc | Business Rules | Complete list of Schematron business rules, their scope, severity, and the elements they constrain | content | Member State developer, Commercial ESPD vendor, Technical support engineer |

## Section 6: Releases

| Page | Title | Scope | Type | Persona(s) |
|------|-------|-------|------|------------|
| index.adoc | Releases | Landing page linking to release documentation and downloads | navigation | All |
| current-release-v5.adoc | Current Release (v5) | Release notes for ESPD-EDM v5.x: what changed, new features, known issues | content | All |
| migration-breaking-changes.adoc | Migration and Breaking Changes | Step-by-step migration guidance from v4 to v5, breaking changes, and compatibility notes | content | Member State developer, Commercial ESPD vendor, Technical support engineer |
| previous-versions-downloads.adoc | Previous Versions and Downloads | Links to v4.x and earlier documentation snapshots, distribution packages, and archived artefacts | content | All |

## Section 7: Further Information

| Page | Title | Scope | Type | Persona(s) |
|------|-------|-------|------|------------|
| index.adoc | Further Information | Landing page linking to look-up and supplementary reference material | navigation | All |
| glossary.adoc | Glossary | Definitions of key terms used throughout the documentation (ESPD, UBL, Schematron, EDM, eForms, etc.) | content | All |
| standards-specifications.adoc | Standards and Specifications | Links to and summaries of referenced standards: UBL 2.4, genericode, ISO Schematron, EU Directives, eForms | content | All |
| related-systems.adoc | Related Systems | Overview of related EU systems (TED, eForms, e-Certis, BRIS) and their interaction with ESPD | content | Procurement policy officer, Technical support engineer |
| repositories-downloads.adoc | Repositories and Downloads | Direct links to all ESPD-EDM GitHub repositories, distribution packages, and tooling downloads | content | All |

---

## Monolithic Page Split Rationale

### tech_request.adoc (731 lines)

The current `tech_request.adoc` is a single monolithic page covering the entire ESPD Request document. Its major sections are:

| Section | Approximate Lines | Content |
|---------|-------------------|---------|
| ESPD Request Business Requirements | 8–12 | Legal basis and business context |
| ESPD Request XSD Schema | 13–24 | UBL 2.4 schema diagram and explanation |
| ESPD Request Cardinalities | 25–44 | Cardinality differences between UBL and ESPD-EDM, Schematron approach |
| Root Elements | 45–185 | Element mapping tables (business requirements ↔ logic ↔ UBL physical layer) |
| Lot Management | 187–244 | eForms-aligned lot handling in the Request |
| EU and Notice Publications | 246–390 | References to TED, Contract Notices, Prior Information Notices |
| Contracting Body | 392–589 | Contracting party structure, related info requirements, element tables |
| Service Provider | 591–731 | Service provider party, element tables |

**Proposed split:**

| Source Sections | Target Page | Rationale |
|----------------|-------------|-----------|
| Business Requirements, XSD Schema, Cardinalities, Root Elements, EU/Notice Publications, Contracting Body, Service Provider (overview and narrative) | Technical Implementation → `espd-request.adoc` | Consolidates the implementer-facing guide: what the Request document is, its schema, cardinality rules, and the key parties. Keeps the page focused on understanding and building an ESPD Request. |
| Lot Management (lines 187–244) | Technical Implementation → `lots-management.adoc` | Lots management is a cross-cutting concern shared between Request and Response; extracting it into a dedicated page avoids duplication and provides a single reference for lot handling. |
| Root Elements detailed tables, Contracting Body detailed element tables, Service Provider detailed element tables | Model Reference → `request-model-reference.adoc` | Granular element-by-element tables are reference material. Separating them keeps the implementation guide readable while providing a comprehensive look-up resource. |

### tech_response.adoc (1451 lines)

The current `tech_response.adoc` covers the entire ESPD Response document. Its major sections are:

| Section | Approximate Lines | Content |
|---------|-------------------|---------|
| Business Requirements Specification | 8–21 | Legal basis and response requirements |
| ESPD Response XSD Schema | 23–41 | UBL 2.4 QualificationApplicationResponse schema diagram |
| ESPD Response Cardinalities | 43–194 | Cardinality constraints diagram and explanation |
| XML Example (root) | 196–204 | Opening XML snippet |
| Reference to Publications and ESPD Request | 206–241 | How the Response references the Request and notices |
| Expected Elements (publications) | 243–319 | Element tables for publications section |
| Economic Operator | 321–381 | EO party introduction and information requirements |
| Related Information Requirements (EO) | 324–381 | EO identification, consortium, subcontracting |
| XSD Schemas (EO) | 383–999 | Detailed EO party element tables, XSD diagrams |
| Answering QUESTIONs | 1001–1031 | How criterion responses work |
| Response XSD Schema | 1033–1075 | TenderingCriterionResponse schema |
| Mock-ups and Data Structures | 1077–1083 | Response mock-up references |
| Expected Elements (responses) | 1085–1233 | Detailed element tables for criterion responses |
| Request/Response XML Example | 1235–1259 | Combined Request/Response XML example |
| XML Example (Responses) | 1261–1278 | Response-only XML snippet |
| Evidence | 1280–1438 | Evidence requirements, structure, element tables |
| Lot Management in the ESPD Response | 1440–1451 | Response-specific lot handling |

**Proposed split:**

| Source Sections | Target Page | Rationale |
|----------------|-------------|-----------|
| Business Requirements, XSD Schema, Cardinalities, XML Example (root), Reference to Publications, Economic Operator overview, Evidence overview | Technical Implementation → `espd-response.adoc` | The implementer-facing narrative: what the Response document is, how it extends the Request, EO party structure, criterion response mechanism, and evidence. Focused on building a valid ESPD Response. |
| Detailed EO element tables (XSD Schemas section), Expected Elements (publications), Expected Elements (responses) | Model Reference → `response-model-reference.adoc` | Granular element tables are pure reference look-up material; extracting them mirrors the Request split and keeps the implementation guide concise. |
| Answering QUESTIONs, Response XSD Schema for TenderingCriterionResponse, Mock-ups and Data Structures, additional response patterns | Criteria → `how-criteria-work.adoc` | The criterion–property–response linking mechanism and "additional responses" pattern are conceptual criteria content relevant across both Request and Response; placing them in the Criteria section gives them a single home. |
| Lot Management in the ESPD Response (lines 1440–1451) | Technical Implementation → `lots-management.adoc` | Merged with the Request lot management content into a unified lots page. |

---

## Reference Implementation Placeholder

The deprecated **ESPD Demo Site** (`espd-demo` repository) is NOT included in the target architecture. It will not appear as a documentation section, navigation entry, or linked tool.

The target architecture reserves two integration points for the **ESPD Service Reference Implementation** (built in `espd-service-sandbox`):

| Section | Page | Role |
|---------|------|------|
| Business Guide | `using-espd-service.adoc` | End-user guidance on accessing and using the live ESPD Service deployment |
| Business Guide | `reference-implementation-guide.adoc` | Developer-oriented overview linking to implementation documentation authored in espd-service-sandbox |

These pages are placeholders until the reference implementation reaches stable release. Their content will be authored separately and integrated via cross-references. No ESPD Demo content will be migrated into these pages.

---

## Criterion JSON

The target architecture includes a dedicated page for the JSON-based criterion data model:

| Section | Page | Purpose |
|---------|------|---------|
| Criteria | `criterion-data-model-json.adoc` | Documents the `espd-edm.json` file that defines all ESPD criterion structures in JSON format, replacing the deprecated Excel-based `ESPD-criterion.xlsx` workflow |

This page is critical for v5 because:
- The JSON format is the canonical source for criterion definitions as of ESPD-EDM v5.
- All existing documentation referencing the Excel-based criterion file must redirect readers here.
- Implementers need clear schema documentation and usage guidance for consuming `espd-edm.json` programmatically.
