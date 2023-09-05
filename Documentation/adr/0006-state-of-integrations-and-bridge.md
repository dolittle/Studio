# 6. state of integrations and bridge

Date: 2023-09-04

## Status

Status: Proposal on 2023-09-04


## Context

This ADR is more a collection of notes and ideas than a decision. It is meant to be a starting point for discussion and be a source for decisions going forward.

[ADR-0001](./0001-expand-studio-web-with-modules-structure.md) and [ADR-002](./0002-immediate-focus-on-integrations-mvp.md) brought about a focus to the modules structure, and allowing the integrations module to evolve in parallell to the applications-module.

Part of that process has lead to a few patterns starting to emerge that could be worthwhile to improve on.

### Dialog state management
With most confirmation dialogs used, there is a need to add boilerplate in the form of passing initial state in, and receiving state back out of the dialog itself. For static dialogs only requiring a confirmation, it suffices to listen to the onClosed callback.

**Suggestion to create Dialog Hook**
For more complex dialogs it would be interesting to explore a hook to programmatically interact with the underlying dialog. This would remove boilerplate around passing state to the dialog, and receiving state back out of the dialog.

### Form as State

### Multi part forms

### TanStack Query as cache




## Decision

The change that we're proposing or have agreed to implement.

## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
