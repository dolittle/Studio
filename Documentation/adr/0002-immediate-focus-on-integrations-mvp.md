# 2. Immediate focus on Bridge / Integrations module

Date: 2023-03-01

## Status

Status: Accepted on 2023-03-01


## Context

As we are building out the MVP around the Bridge / Integrations module, it's important that we focus on getting to a place where we can drive out the actual functionality needed before we establish it as a new product offering for existing customers. This means that even though we have defined a layout for how the experience will be for existing customers around "spaces" and "modules", this doesn't need to be in place until the integrations MVP is ready.

## Decision

For the immediate future new changes to Studio will be around the Bridge / Integrations module, without needing to make changes to the solutions-module. The exception to this is when changing shared components in the Design System, which should be done in a way that doesn't break the existing solutions-module.

## Consequences

By optimizing for the Bridge / Integrations module, we are allowing ourselves to iterate faster. It will however mean that there is a risk that the components that are introduced in this period don't match well with the existing solutions-module. There will also be more work to do when are ready to merge the two experiences for end users.

- Establish new route for integrations that is only available if you know the url (/selfservice/integrations)
- New Layout that will be used for the integrations module
- New components that will be used for the integrations module
- New API's that will live under `/apis/integration`. This should be generated routes / types, and wrapped in react-query for easy consumption from react components.
- All new routes and components should be under `/integrations`- or `/components`- folders
