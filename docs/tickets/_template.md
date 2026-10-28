---
id: NNNN-TT # spec number + two-digit ticket number; the file name starts with it
spec: NNNN
title: Short imperative title
status: draft # draft (still being detailed) | ready (implementer may take it). Done = file deleted by the merged PR
depends_on: [] # ticket ids that must be done on main first
scope: # files this ticket is expected to change (informational, not enforced)
  - src/example/**
---

# NNNN-TT: Short imperative title

## Goal

One or two sentences: what exists after this ticket that didn't before, and why.

## Read first

Exact files (and design node ids) to read before writing code.

## Do

Numbered, concrete steps: file names, component names, where code moves from and to.

## Don't

What must stay untouched; what is a later ticket's job.

## Acceptance

- [ ] `npm run check` passes.
- [ ] `npm run build` passes.

## Notes

Context the implementer may need; known gotchas.
