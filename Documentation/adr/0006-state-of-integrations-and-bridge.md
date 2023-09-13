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
We are already using `react-hook-form` across the application to wire up form parameters. This is very straight forward when input's match the shape of the data that's going to be submitted. However, in the case of the the Integrations module, there are several examples where the form is access programmatically to add data. The M3SetupForm and the MessageMappingForm.

The benefit of doing it this way is that child components can use the form hooks to access the form state. This is also practical when wiring up a submit-button.

### Multi part forms
A pattern has emerged where there is a visual form that wraps multiple post requests. There are potentially different ways to approach the design of this, but the current solution has merged the multiple requests as a single form component. This means the onSubmit handler needs to evaluate what data has changed (marked as `isDirty`) and submit the relevant data.

To make this more manageable, a pattern has been introduced to capture the result of the submit action so the parent component can react to any changes needed.
The pattern is not solidified, or well thought-through and is ripe for improvement.

### TanStack Query as cache
As mentioned in [ADR 0005](./0005-tanstack-query-for-entire-studio-web.md). TanStack Query (TSQ) is used as a practical way to consume and interact with queries and mutations in the application. By default TSQ is configured to not cache the results of queries. This means that they are always stale, and thus force a request to the server each time. For some specific cases though the staleTime has been increased for queries. This can be used as a practical way to cache data that is not expected to change often. For further optimization of certain queries this can be increased even further.

Use the caching mechanism actively to improve performance of the application.

As a rule of thumb, the "top-level" component of a route should be the one that runs a query, and all children should be passed that data in. There are some cases, though where it makes sense to encapsulate a logical part of the UI and run queries there as well. This can be practical when building dynamic UI's where entire components can be either moved around, or used in different views.

**Cache Invalidation**
The power of react query is when an action further down the parent/child hierarchy needs to refresh the page. This can be done by invalidating the cache for a specific query. This will force a re-fetch of the data, and update the UI. It is a technique that is heavily used as part of submitting forms.

**Local Storage**
What has NOT been used yet is caching query-results as part of local storage. There is an official [`persistQueryClient`](https://tanstack.com/query/latest/docs/react/plugins/persistQueryClient) that can be used for this purpose. Be weary about invalidating this cache.


## Decision

No decisions made as part of this ADR.

## Consequences

No direct consequences as part of this ADR.
