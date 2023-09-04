# 5. tanstack query for entire studio web

Date: 2023-09-04

## Status

Status: Proposal on 2023-09-04


## Context

Ref [ADR-0002](./0002-immediate-focus-on-integrations-mvp.md) for the context around the integrations module. [TanStack Query](https://tanstack.com/query/latest)(previously React Query) was introduced as a way to wrap the api's for the integrations module. This has made consuming API's in the integrations module much easier, and we should continue to use this approach for future API's. TanStack Query give some good defaults, and straight forward conventions that an be used across the application.
It seems fitting to use this approach for th rest of the application as well.

It will still be up to each individual component to start to use queries wrapped in TanStack Query hooks, which will make this a gradual transition.

## Decision

Lift up TanStack Query to the App.tsx and wrap the entire application in a QueryClientProvider. This will allow us to use the QueryClient and TanStack Query hooks in any component in the application.
Introduce hooks around the API's that are used in the application, and use these hooks in the components that need to consume the API's.

## Consequences

**Pro's**
- A lot easier to build components consuming logic around api's
- Ability to actively cache or invalidate cache for components.
- No consequence to make available to entire app
- Easy to introduce for new functionality

**Con's**
- May need some re-writing to existing components.
- Re-writes wil require components to be tested again, since there are no regression tests.
-