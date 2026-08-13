# Migration Mapping

## Disposition Summary

| Disposition | Count | Percentage |
|-------------|-------|-----------|
| move-as-is  | 7     | 24%       |
| split       | 6     | 21%       |
| merge       | 7     | 24%       |
| rewrite     | 5     | 17%       |
| remove      | 3     | 10%       |
| TBD         | 1     | 3%        |
| **Total**   | **29**| **100%**  |

> Counts include all 28 published pages + 1 partial from [01-current-state-inventory.md](./01-current-state-inventory.md). Target pages reference the architecture defined in [02-target-architecture.md](./02-target-architecture.md).

---

## Mapping Table

### Module: ROOT

| # | Source File | Disposition | Target Section | Target Page(s) | Notes | Assets |
|---|------------|-------------|----------------|----------------|-------|--------|
| 1 | pages/index.adoc | rewrite | Introduction | index.adoc | Rewrite as goal-oriented Introduction landing page; current content is a brief tile layout with links to business/technical modules. New version links to all 7 sections. | — |
| 2 | pages/release_notes.adoc | move-as-is | Releases | current-release-v5.adoc | Move release notes content to Releases section; update xrefs to new paths | — |
| 3 | pages/demo.adoc | remove | — | — | ESPD Demo deprecated in v5; page documents deprecated tooling. See [Demo Site References](#demo-site-references). | ⚠️ images (espd_demo_site.png) |
| 4 | pages/home.adoc | remove | — | — | Superseded by new Introduction index.adoc; contains v4.0.x branding and roadmap image no longer relevant | ⚠️ images (home_roadmap.png) |

### Module: business

| # | Source File | Disposition | Target Section | Target Page(s) | Notes | Assets |
|---|------------|-------------|----------------|----------------|-------|--------|
| 1 | pages/index.adoc | rewrite | Business Guide | index.adoc | Rewrite as Business Guide navigation landing; current tile layout replaced by structured links to new Business Guide sub-pages | — |
| 2 | pages/business_info.adoc | split | Introduction, Business Guide | what-is-espd.adoc, procurement-process.adoc, for-contracting-authorities.adoc, for-economic-operators.adoc | 240 lines covering ESPD overview, legal framework, process diagrams, and buyer/supplier guidance. Intro content → Introduction section; business guidance → Business Guide. See [Split Details](#businessinfoadoc--multiple-pages). | ⚠️ images (espd_bus_buyer.png, espd_bus_supplier.png), kroki diagrams |
| 3 | pages/implementation.adoc | merge | Business Guide | using-espd-service.adoc | Merge with using.adoc; rewrite to reference new ESPD Service Reference Implementation instead of deprecated demo | — |
| 4 | pages/using.adoc | merge | Business Guide | using-espd-service.adoc | Merge with implementation.adoc; combined content describes how to access and use an ESPD service | — |
| 5 | pages/espd_form.adoc | rewrite | Business Guide | for-contracting-authorities.adoc, for-economic-operators.adoc | 157 lines of form screenshots; rewrite as Business Guide example content (not specification). Screenshots may be replaced by reference implementation screenshots. | ⚠️ images (form/of1.png–of29.png, form/testbed.png — 30 images) |

### Module: business — Partials

| # | Source File | Disposition | Target Section | Target Page(s) | Notes | Assets |
|---|------------|-------------|----------------|----------------|-------|--------|
| 1 | pages/_creating.adoc | remove | — | — | Orphaned partial not included by any published page; referenced only in commented-out nav entries using obsolete `espd-bus` component prefix | — |

### Module: technical

| # | Source File | Disposition | Target Section | Target Page(s) | Notes | Assets |
|---|------------|-------------|----------------|----------------|-------|--------|
| 1 | pages/index.adoc | rewrite | Technical Implementation | index.adoc | Rewrite as Technical Implementation navigation landing; current tile layout links to monolithic pages that will be split | — |
| 2 | pages/tech_rules_reference.adoc | merge | Model Reference | business-rules.adoc | Merge with tech_busrules.adoc and tech_br_espd_profile.adoc into unified business rules reference | — |
| 3 | pages/tech_dist_pack.adoc | rewrite | Criteria | distribution-tooling.adoc | Rewrite to focus on criterion artefacts and tooling; update all references from Excel-based workflow to JSON-based workflow (espd-edm.json). See [Rewrite Rationale](#rewrite-rationale). | — |
| 4 | pages/tech_architecture.adoc | split | Technical Implementation, Introduction | getting-started.adoc, procurement-process.adoc | Architecture overview → Tech Impl getting-started.adoc; procurement procedure steps → Introduction procurement-process.adoc. See [Split Details](#tech_architectureadoc--2-pages). | ⚠️ images (ESPD_Architecture_Overview.jpg, ESPD_Buyer_*.jpg, ESPD_EO_Response.jpg) |
| 5 | pages/tech_request.adoc | split | Technical Implementation, Model Reference | espd-request.adoc, lots-management.adoc, request-model-reference.adoc | 731 lines split per architecture rationale. See [Split Details](#tech_requestadoc--3-pages). | ⚠️ images (Qualification_Application_Request-2.3.jpg, Qualification_ApplicationRequest_UML_diagram.jpg, Lot_ID_schema.jpg, Overview_new_lot_management_approach.jpg, Procurer_identification_mockup.jpg, Publications_mock-up.jpg, cacContractingParty_*.jpg, cacServiceProvider*.jpg) |
| 6 | pages/tech_response.adoc | split | Technical Implementation, Model Reference, Criteria | espd-response.adoc, lots-management.adoc, response-model-reference.adoc, how-criteria-work.adoc | 1450 lines split per architecture rationale. See [Split Details](#tech_responseadoc--4-pages). | ⚠️ images (Qualification_Application_Response*.jpg, Economic_Operator_overview.jpg, EO_*.jpg, Party__economic party.jpg, cacEvidence*.jpg, cacTendering*.jpg, cacResponse_Value*.jpg, Reference_ESPD_Request.jpg, URI_Reference_ESPD_Request.jpg) |
| 7 | pages/tech_common_aspects_for_criteria.adoc | split | Criteria, Model Reference | how-criteria-work.adoc, criteria-catalogue.adoc | 867 lines; guide content (criterion structure, property groups, response patterns) → Criteria how-criteria-work.adoc; reference tables (criterion classification, data structures) → Model Reference criteria-catalogue.adoc. See [Split Details](#tech_common_aspects_for_criteriaadoc--2-pages). | ⚠️ images (Criterion_UML_diagram.jpg, Initial_Question_data_structure.jpg, Initial_question_Mockup.jpg, ONTRUE_ONFALSE_choice_control.jpg, Case1–4*.jpg, Use_CAPTION.jpg, Use_code_list_BooleanGUIControlType.jpg), demo site xrefs |
| 8 | pages/tech_exclusion_criteria.adoc | move-as-is | Criteria | exclusion-grounds.adoc | 430 lines; move to Criteria section with path/xref updates. Update demo site references to point to reference implementation. | ⚠️ images (Convictions_data_structure.jpg, Payment_Taxes*.jpg, Environmental_Law*.jpg, Bankruptcy*.jpg, Professional_misconduct*.jpg, Conflict_interest*.jpg, Early_termination*.jpg, Misrepresentation*.jpg, Purely_national*.jpg, Contributions*.jpg), demo site xrefs |
| 9 | pages/tech_selection_criteria.adoc | move-as-is | Criteria | selection-criteria.adoc | 973 lines; move to Criteria section with path/xref updates. Contains extensive demo site references (20+ occurrences) requiring update. | ⚠️ images (Selection_criteria_classification.jpg, SC_Suitability*.jpg, Average_yearly_turnover*.jpg, Specific_average_turnover*.jpg, Financial_ratio*.jpg, Risk_indemnity*.jpg, Other_economic*.jpg, References_*.jpg, Abilities_*.jpg, Subcontracting*.jpg, Samples_certificates*.jpg, Quality_Assurance*.jpg, Reduction_candidates*.jpg, EO-Specific-year-turn.jpg, Spec-aver-year-turn*.jpg, General_*.jpg, Suitability*.jpg, Sheltered_workshop*.jpg, Special_requirements*.jpg, Group_EO*.jpg, Economic_operator_indemnity*.jpg), demo site xrefs |
| 10 | pages/tech_validation.adoc | split | Criteria, Technical Implementation | validation-conformance.adoc, common-concepts.adoc | 250 lines; criteria-specific validation (CVA constraints) → Criteria validation-conformance.adoc; general Schematron approach → Tech Impl common-concepts.adoc | ⚠️ images (Validation_Process.jpg, ESPD_Schematron_life-cycle.jpg, Architecture_codelist_validation.jpg, Architecture_non-codelist_validation.jpg, Execution_files.jpg, Execution_validation_process_codelists.jpg, CodeList_Validation_Execution_files.jpg, SCH_file_example.jpg, CVA_example.jpg), demo site xrefs |
| 11 | pages/tech_codelist.adoc | merge | Model Reference | code-lists.adoc | 701 lines; merge with bus_codelist.adoc and tech_codelist_examples.adoc into unified code lists reference | ⚠️ images (Elements_metadata_of_ESPD_codelist.jpg, Code_attributes.jpg, Identifier_attributes.jpg, Values_schemeID_Party_Identifiers.jpg, Codelist_business_rules.jpg, Non-codelist_business_rules.jpg, eo-role-type.jpg) |
| 12 | pages/tech_busrules.adoc | merge | Model Reference | business-rules.adoc | 75 lines; merge with tech_rules_reference.adoc into Model Reference business-rules.adoc | — |
| 13 | pages/tech_glossary.adoc | move-as-is | Further Information | glossary.adoc | 145 lines; move to Further Information section with minimal editing | — |
| 14 | pages/bus_codelist.adoc | merge | Model Reference | code-lists.adoc | 56 lines; merge with tech_codelist.adoc and tech_codelist_examples.adoc into unified code lists reference | — |
| 15 | pages/tech_br_espd_profile.adoc | TBD | Model Reference | business-rules.adoc | 2740 lines — very large. Content is BII41 profile rules. Decision needed: how much to retain vs. remove (see [TBD Items](#tbd-items)). If retained, becomes sub-content or linked appendix within business-rules.adoc. | ⚠️ images (bis1–5.png) |
| 16 | pages/tech_br_request_reqs.adoc | move-as-is | Model Reference | request-model-reference.adoc | 148 lines; move as requirements sub-section within request model reference page | — |
| 17 | pages/tech_br_response_reqs.adoc | move-as-is | Model Reference | response-model-reference.adoc | 135 lines; move as requirements sub-section within response model reference page | — |
| 18 | pages/tech_codelist_examples.adoc | merge | Model Reference | code-lists.adoc | 394 lines of XML examples; merge into code-lists.adoc as examples sub-section | — |
| 19 | pages/tech_external_resources.adoc | move-as-is | Further Information | related-systems.adoc | 14 lines; move to Further Information section as starting content for related-systems.adoc | — |

---

## Split Details

### tech_request.adoc → 3 pages

Source: [Inventory technical #5](./01-current-state-inventory.md) — 731 lines

| Source Lines (approx.) | Target Section | Target Page | Content Description |
|----------------------|----------------|-------------|---------------------|
| 1–205 (Business Requirements, XSD Schema, Cardinalities, Root Elements overview, Lot Management narrative) + 246–390 (EU/Notice Publications) + 392–589 (Contracting Body narrative) + 591–731 (Service Provider narrative) | Technical Implementation | espd-request.adoc | Implementer-facing guide: what the Request document is, its schema, cardinality rules, lot management overview, and the key parties (contracting body, service provider). Keeps the page focused on understanding and building an ESPD Request. |
| 187–244 (Lot Management) | Technical Implementation | lots-management.adoc | Lot management is a cross-cutting concern shared between Request and Response. Extracting it avoids duplication. Merges with Response lot content (lines 1440–1451 of tech_response.adoc). |
| 45–185 (Root Elements detailed tables) + 392–589 (Contracting Body element tables) + 591–731 (Service Provider element tables) | Model Reference | request-model-reference.adoc | Granular element-by-element reference tables (cardinalities, data types, business rules per element). Separating them keeps the implementation guide readable while providing comprehensive look-up. Also receives content from tech_br_request_reqs.adoc (148 lines). |

### tech_response.adoc → 4 pages

Source: [Inventory technical #9](./01-current-state-inventory.md) — 1450 lines

| Source Lines (approx.) | Target Section | Target Page | Content Description |
|----------------------|----------------|-------------|---------------------|
| 1–204 (Business Requirements, XSD Schema, Cardinalities, XML Example root) + 206–319 (Reference to Publications, Expected Elements publications) + 321–381 (Economic Operator overview) + 1280–1438 (Evidence overview) | Technical Implementation | espd-response.adoc | Implementer-facing narrative: what the Response document is, how it extends the Request, EO party structure, criterion response mechanism, and evidence handling. |
| 383–999 (Detailed EO element tables, XSD Schemas) + 243–319 (Expected Elements publications) + 1085–1233 (Expected Elements responses) | Model Reference | response-model-reference.adoc | Granular element tables are pure reference look-up material. Also receives content from tech_br_response_reqs.adoc (135 lines). |
| 1001–1083 (Answering QUESTIONs, Response XSD Schema for TenderingCriterionResponse, Mock-ups and Data Structures) | Criteria | how-criteria-work.adoc | The criterion–property–response linking mechanism is conceptual criteria content relevant across both Request and Response. Placing it in the Criteria section gives it a single home. |
| 1440–1451 (Lot Management in the ESPD Response) | Technical Implementation | lots-management.adoc | Merged with Request lot management content (tech_request.adoc lines 187–244) into a unified lots page. |

### tech_common_aspects_for_criteria.adoc → 2 pages

Source: [Inventory technical #6](./01-current-state-inventory.md) — 867 lines

| Source Lines (approx.) | Target Section | Target Page | Content Description |
|----------------------|----------------|-------------|---------------------|
| 1–500 (Criterion structure explanation, Property groups, ONTRUE/ONFALSE logic, GUI control types, Response patterns, Initial questions) | Criteria | how-criteria-work.adoc | Guide content explaining how the criterion–property–response chain works, property group types (ONTRUE, ONFALSE), requirement vs. question distinction, and response linking patterns. |
| 501–867 (Criterion classification tables, data structure diagrams, reference tables, XML examples) | Model Reference | criteria-catalogue.adoc | Reference material: complete criterion taxonomy, data structure definitions, and example XML. Provides the look-up resource for criterion definitions. |

### business_info.adoc → multiple pages

Source: [Inventory business #4](./01-current-state-inventory.md) — 240 lines

| Source Lines (approx.) | Target Section | Target Page | Content Description |
|----------------------|----------------|-------------|---------------------|
| 1–60 (ESPD overview, what it is, two-part structure) | Introduction | what-is-espd.adoc | General explanation of ESPD: what it is, its two-part structure (Request + Response), and role in pre-qualification. Accessible to all personas. |
| 50–80 (Legal framework, EU Directives, timeline diagram) | Introduction | procurement-process.adoc | Legal basis (Directive 2014/24/EU Art. 59, Regulation 2016/7) and process context. Partially overlaps with legal-framework.adoc (new content). |
| 80–160 (Buyer process, ESPD from CA perspective) | Business Guide | for-contracting-authorities.adoc | Guidance for buyers on preparing ESPD Requests, selecting criteria. Includes process diagram (espd_bus_buyer.png). |
| 160–240 (Supplier process, ESPD from EO perspective) | Business Guide | for-economic-operators.adoc | Guidance for suppliers on completing the ESPD Response, providing evidence. Includes process diagram (espd_bus_supplier.png). |

### tech_architecture.adoc → 2 pages

Source: [Inventory technical #4](./01-current-state-inventory.md) — 87 lines

| Source Lines (approx.) | Target Section | Target Page | Content Description |
|----------------------|----------------|-------------|---------------------|
| 1–45 (Architecture overview, distribution package context, repository structure) | Technical Implementation | getting-started.adoc | Quick-start context for implementers: what the ESPD-EDM architecture looks like, where to find artefacts. |
| 46–87 (Procurement Procedure Steps diagram and explanation) | Introduction | procurement-process.adoc | The step-by-step procurement procedure flow (Plan → Request → Response) is conceptual content belonging in Introduction, not Technical Implementation. Complements content from business_info.adoc. |

### tech_validation.adoc → 2 pages

Source: [Inventory technical #10](./01-current-state-inventory.md) — 250 lines

| Source Lines (approx.) | Target Section | Target Page | Content Description |
|----------------------|----------------|-------------|---------------------|
| 1–140 (Validation process overview, Schematron life-cycle, execution files, general validation architecture) | Technical Implementation | common-concepts.adoc | General Schematron validation approach, execution files, and validation process overview. Becomes part of the shared technical concepts page. |
| 141–250 (CVA code list validation, criteria-specific validation rules, demo UUID references) | Criteria | validation-conformance.adoc | Criteria-specific validation: CVA constraints, code list validation for criterion elements, conformance testing patterns. |

---

## Merge Details

| Source Files | Target Section | Target Page | Rationale |
|-------------|----------------|-------------|-----------|
| business/implementation.adoc + business/using.adoc | Business Guide | using-espd-service.adoc | Both pages describe how to use an ESPD service from slightly different angles (what an implementation is vs. how to use it). Combined content provides a complete "using the ESPD service" guide. |
| technical/tech_rules_reference.adoc + technical/tech_busrules.adoc + technical/tech_br_espd_profile.adoc (TBD) | Model Reference | business-rules.adoc | Business rules are currently scattered across three files with overlapping scope. Unifying them provides a single reference for all Schematron rules, their severity, and element constraints. |
| technical/tech_codelist.adoc + technical/bus_codelist.adoc + technical/tech_codelist_examples.adoc | Model Reference | code-lists.adoc | Code list documentation is fragmented across three files (detailed catalogue, overview, XML examples). Merging provides a complete code list reference in one place. |
| technical/tech_request.adoc (lot lines) + technical/tech_response.adoc (lot lines) | Technical Implementation | lots-management.adoc | Lot management content is split between Request and Response documents but is a single cross-cutting concern. A unified page eliminates duplication and provides one authoritative reference for lot handling. |
| technical/tech_br_request_reqs.adoc + tech_request.adoc (element tables) | Model Reference | request-model-reference.adoc | Contracting Body requirements (148 lines) are a natural sub-section of the request model reference page alongside the detailed element tables extracted from tech_request.adoc. |
| technical/tech_br_response_reqs.adoc + tech_response.adoc (element tables) | Model Reference | response-model-reference.adoc | Economic Operator requirements (135 lines) are a natural sub-section of the response model reference page alongside the detailed element tables extracted from tech_response.adoc. |

---

## Rewrite Rationale

| Source File | Target Section | Target Page | Scope of Rewrite |
|-------------|----------------|-------------|-----------------|
| ROOT/pages/index.adoc | Introduction | index.adoc | Current page is a brief tile layout linking to business and technical modules. Rewrite as a goal-oriented Introduction landing with brief overview paragraph and links to all Introduction sub-pages. Must work as the new site entry point for all personas. |
| business/pages/index.adoc | Business Guide | index.adoc | Current page is a tile layout linking to business module pages. Rewrite as Business Guide navigation landing linking to new sub-pages (for-contracting-authorities, for-economic-operators, etc.). |
| technical/pages/index.adoc | Technical Implementation | index.adoc | Current page is a large tile layout (112 lines) linking to all technical pages. Rewrite as focused Technical Implementation landing with links to split/reorganised sub-pages (getting-started, espd-request, espd-response, etc.). |
| business/pages/espd_form.adoc | Business Guide | for-contracting-authorities.adoc, for-economic-operators.adoc | 157 lines of ESPD form screenshots (30 images). Rewrite scope: treat as illustrative example content rather than specification. Screenshots may be replaced by reference implementation screenshots. Content split between CA perspective and EO perspective pages. |
| business/pages/business_info.adoc (partial rewrite within split) | Introduction | what-is-espd.adoc | Opening 60 lines contain general ESPD description that must be rewritten for a broader audience (all personas). Current text is business-user focused; new version must be persona-neutral. |
| technical/pages/tech_dist_pack.adoc | Criteria | distribution-tooling.adoc | 70 lines describing the distribution package. Rewrite to focus on criterion artefacts and tooling, update all references from Excel-based workflow to JSON-based workflow (espd-edm.json). |
| technical/pages/tech_common_aspects_for_criteria.adoc (guide portion) | Criteria | how-criteria-work.adoc | Guide content extracted from the split must be rewritten to work as a standalone explanation of the criterion–property–response chain without assuming the reader has read the monolithic technical page context. |

---

## TBD Items

| Source File | Outstanding Question | Decision Needed By |
|-------------|---------------------|-------------------|
| technical/tech_br_espd_profile.adoc (2740 lines) | How much of the BII41 profile content to retain? Options: (a) keep all as appendix/linked reference within business-rules.adoc, (b) extract only rules relevant to ESPD-EDM v5 and remove legacy BII41 framing, (c) remove entirely if profile is superseded by eForms. | Documentation lead / product owner — before migration execution begins |
| technical/tech_br_espd_profile.adoc | If retained, should this be inline within business-rules.adoc or a separate linked page (e.g., business-rules-bii41-profile.adoc)? The 2740-line size suggests a separate page may be more practical. | Documentation lead |
| business/pages/espd_form.adoc | Should the 30 demo form screenshots be replaced with reference implementation screenshots, or should the page be reduced to text-only guidance without screenshots? | Product owner / UX — depends on reference implementation UI stability |

---

## Demo Site References

All pages and navigation entries that link to the deprecated ESPD Demo Site (`https://docs.ted.europa.eu/espd-demo/`). These require updates as part of migration per [Requirement 6.1](./01-current-state-inventory.md).

| Source File | Reference Type | Required Update |
|-------------|---------------|-----------------|
| ROOT/pages/demo.adoc | Dedicated page | Remove entire page (disposition: remove) |
| ROOT/pages/index.adoc | Commented-out nav entry (`xref:espd-tech::demo.adoc`) | Remove commented-out entry during migration |
| ROOT/nav.adoc | Commented-out nav entry (`xref:espd-tech::demo.adoc[Demo ESPD Service Online]`) | Remove commented-out entry |
| business/nav.adoc | Commented-out nav entry (duplicate) | Remove commented-out entry |
| technical/nav.adoc | Commented-out nav entry (duplicate) | Remove commented-out entry |
| technical/tech_request.adoc | Inline link (2 occurrences: lines ~202, ~381) | Replace with reference to ESPD Service Reference Implementation or GitHub example files |
| technical/tech_response.adoc | Commented inline link (line ~839) | Remove or replace with GitHub example file reference |
| technical/tech_common_aspects_for_criteria.adoc | Inline link (line ~117) | Replace with GitHub example file reference |
| technical/tech_exclusion_criteria.adoc | Inline links (10 occurrences across multiple criterion sections) | Replace with reference implementation or GitHub example references |
| technical/tech_selection_criteria.adoc | Inline links (20+ occurrences across all criterion sub-sections) | Replace with reference implementation or GitHub example references |
| technical/tech_validation.adoc | Inline link (line ~198) | Replace with reference implementation or GitHub criterion UUID reference |
| business/pages/using.adoc | Indirect reference (links to espd_form.adoc which demonstrates a service) | Update link target to reference implementation guidance |
| ROOT/images/espd_demo_site.png | Image asset | Remove (no longer needed after demo.adoc is removed) |
