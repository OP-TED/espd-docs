# ESPD Documentation Guidelines

This document is for maintainers and reviewers of the ESPD-EDM documentation published from this repository. It establishes principles for deciding where information belongs, keeping content consistent, and avoiding unnecessary duplication across the ESPD repositories.

## Repository Responsibilities

### ESPD-EDM (`OP-TED/ESPD-EDM`)

The [ESPD-EDM repository](https://github.com/OP-TED/ESPD-EDM) is the primary source for **versioned technical release artefacts**, including:

- XML schemas (UBL-based ESPD Request and Response)
- Criteria definitions (`criterion/espd-edm.json`)
- Code lists (genericode files)
- Validation artefacts (Schematron-derived XSL)
- Machine-readable examples and conformance resources
- Technical release metadata (tags, release notes on GitHub)

Its README orients developers to the release and its artefacts. It should contain concise instructions for locating, building, validating, or testing artefacts — but it is not the full implementation handbook.

### espd-docs (`OP-TED/espd-docs`) — this repository

This repository is the maintained source of the **human-readable ESPD-EDM documentation** published on [TED Developer Docs](https://docs.ted.europa.eu/ESPD-EDM/latest/index.html). It explains:

- Business and legal context of the ESPD
- Terminology and conceptual architecture
- ESPD Request and Response structures
- Criteria and answer models
- Validation and conformance guidance
- Implementation guidance for ESPD services
- Version compatibility and migration

TED Developer Docs is the **publication surface** generated from this repository (via Antora). It is not a separate independently maintained documentation source.

### One maintained source for each topic

Each topic should have **one primary maintained location**. Other locations may provide a short orientation or summary with a link to the primary source. Detailed content should not be independently duplicated across repositories.

When deciding where a piece of content belongs, ask:

1. Is it a machine-processable artefact or instructions for using one? → ESPD-EDM repository.
2. Is it a human-readable explanation, guide, or contextual narrative? → This repository (espd-docs).

## Authority and Interpretation

Use careful language when describing authority:

- **EU legal acts** (Directives, Regulations) remain authoritative for legal requirements.
- **Versioned ESPD-EDM artefacts** (schemas, criteria, code lists, validation rules) define the machine-processable structures and validation behaviour of a release.
- **Published documentation** (generated from this repository) is the primary human-readable explanation of those artefacts.
- **Examples and implementation recommendations** are informative unless explicitly stated otherwise.

The documentation must explain existing requirements. It must not accidentally introduce new normative requirements that are not grounded in legal acts or the technical artefacts.

Apparent inconsistencies between legal requirements, documentation, examples, schemas, criteria definitions, and validation rules should be treated as defects that need explicit resolution — not silently resolved by choosing one interpretation over another.

## Normative and Informative Content

Documentation should clearly distinguish:

- **Binding requirements** — derived from EU legal acts or formally adopted specifications.
- **Explanatory content** — contextual information helping readers understand a topic.
- **Implementation recommendations** — suggested approaches that are not mandatory.
- **Examples** — illustrative material that does not override normative definitions.

Use terminology such as "must," "should," and "may" consistently, but only where the source and status of the requirement are clear. Do not use normative language for content that is merely a recommendation or illustration.

## Documentation and Artefacts Evolve Together

A change to XML structures, criteria, code lists, validation rules, identifiers, or compatibility should normally include the related documentation update in the same release process.

Documentation pages should link to artefacts belonging to the **matching release or Git tag** (currently configured via the `url-tree` attribute in `antora.yml`), not to mutable branches where content may diverge from the documented version.

## Versioning

The following practices apply:

- The `/latest/` URL segment should represent the latest stable documentation.
- Preview or beta documentation should be clearly labelled (using Antora's `prerelease` attribute or equivalent).
- Historical documentation should remain accessible where practical.
- Each documentation version should identify the ESPD-EDM version it describes (currently reflected in `antora.yml` via the `version` field).
- Links to ESPD-EDM artefacts should point to the corresponding release tag, not to `main` or development branches.

## Authoring Practices

The following practical rules apply to content in this repository:

1. **Use consistent ESPD terminology.** Refer to concepts using the same terms used in the published documentation and the ESPD-EDM artefacts (e.g., "Economic Operator," "Contracting Authority," "Criterion," "Requirement Group").

2. **Use descriptive link text.** Write links that describe the destination (e.g., "see the Release Notes for v5.0.0") rather than generic phrases like "click here."

3. **Avoid manually copying large technical tables** when they can be generated or referenced from source artefacts. Where the Antora build does not currently automate this, note it as a future improvement rather than duplicating volatile data.

4. **Ensure XML examples validate** against the documented release. Examples should be tested with the validation artefacts from the corresponding ESPD-EDM version.

5. **Link to authoritative external standards** (UBL, genericode, EU Vocabularies) rather than reproducing their content unnecessarily.

6. **Keep editorial instructions out of public content.** Internal notes, TODO markers, or review comments should not appear in published pages. Use AsciiDoc comments (`//`) for draft notes that must remain in source temporarily.

7. **Clearly distinguish current practices from future recommendations.** If this document or any page recommends a practice that is not yet implemented (e.g., automated generation of tables), mark it as a planned improvement.

## Scope of This Document

This document covers documentation principles and content ownership. It does not prescribe:

- Detailed writing-style rules (capitalisation, punctuation, sentence length)
- Specific tooling or automation beyond what the repository currently uses
- Contribution workflows or pull-request processes

These may be documented separately as the project evolves.
