# Architecture Decision Records (ADRs)

This folder contains Architecture Decision Records (ADRs) for the Randonneurs Belarus (rbelby) website.

## Format

Each ADR is a markdown note with YAML frontmatter. Use the following template:

```markdown
---
type: ADR
id: "0000"
title: "Short decision title"
status: proposed        # proposed | active | superseded | retired
date: YYYY-MM-DD
superseded_by: "0000"  # only if status: superseded
---

## Context
What situation led to this decision? What forces and constraints are at play?

## Decision
**What was decided.** State it clearly in one or two sentences — bold so it stands out.

## Options considered
- **Option A** (chosen): brief description — pros / cons
- **Option B**: brief description — pros / cons
- **Option C**: brief description — pros / cons

## Consequences
What becomes easier or harder as a result?
What are the positive and negative ramifications?
What would trigger re-evaluation of this decision?

## Advice
*(optional)* Input received before making this decision — who was consulted, what they said, when.
Omit if the decision was made unilaterally with no external input.
```

### Status lifecycle

```
proposed → active → superseded
                 ↘ retired      (decision no longer relevant, not replaced)
```

## Rules

- One decision per file.
- Files named `NNNN-short-title.md` (monotonic numbering).
- Once `active`, never edit the core decision — supersede it instead.
- When superseded: update `status: superseded` and add `superseded_by: "NNNN"`.
- [`docs/CONSTITUTION.md`](../CONSTITUTION.md) reflects the current state (active decisions only).

## Index

| ID | Title | Status |
|----|-------|--------|
| *(Empty until the first ADR is created)* | | |
