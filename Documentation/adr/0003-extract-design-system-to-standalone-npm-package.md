# 3. Extract design system to standalone npm package

Date: 2023-09-04

## Status

Status: Proposal on 2023-09-04


## Context

Within the current mono-repo setup of Studio, the design system is a sub-package of the main application. This means that the design system is not easily accessible to other applications that may want to use it. Ex: Authentication Web.
It also means that whenever a build of Studio/Web is triggered, the design system is also built, which should not be necessary. This connection also means that implementing component testing for Studio/Web is more difficult than it needs to be, as there as aspects of the Design System that need to be mocked out in order to test the application in isolation.
The Design system itself has all the makings of a standalone sub-project, and should be amended to function as such.

To summarize the work involved:
- Change the build of the Design System to output a standalone package that can be published to npm
- Update build scripts on Github to publish the Design System to npm
- Update Studio/Web to use the new Design System through npm
- Have a good dev-story for consuming local design system changes in Studio/Web before pushing

From an time-perspective, this is not critical, but it is holding back the ability to test Studio/Web in isolation, and it is also holding back the ability to use the Design System in other applications.

Experiments and thoughts of how to do this has been done in the following PR: **origin/bundleify-design-system**
It is not complete, nor fully functioning, but it is a good starting point for getting into the solution space. It is also far behind origin/main, so merging is not a good idea. What remains is the possibility to consume the Design System locally in Studio/Web in this branch.

## Decision

The change that we're proposing or have agreed to implement.

## Consequences

**Pro's**
- Better separation of concerns
- Easier to test both Design System and Studio/Web in isolation
- Separate builds for Design System and Studio/Web, which also mean separate deployments
- Faster builds locally and on CI
- Already have ownership over the @aigonix organization on npm
- Makes testing a lot easier

**Con's**
- Time involved to separate the Design System from Studio/Web.
- Any changes to design changes need to be pushed before (or at the same time) as Studio/Web changes. Unclear about how quickly npm publishes
