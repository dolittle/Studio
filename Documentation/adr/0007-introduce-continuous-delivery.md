# 7. Introduce continuous delivery

Date: 2023-09-14

## Status

Status: Accepted on 2023-09-14


## Context

As a mechanism to increase the speed of delivery and reduce the risk of change, we want to introduce continuous delivery. This will allow us to deploy changes to production without going through the cumbersome process of creating and merging pull requests.

There are at least two parts to this:
  1. Introduce a continuous deliver pipeline that runs on every commit to the `main` branch, and deploys this commit to dev.
  2. Introduce feature flags as a way to hide features under development from users.
  3. Testing of the application will need to be automated to ensure that the application is still working as expected - this is addressed in [ADR-0004](./0004-implement-automated-testing.md)


## Decision

Implement continuous delivery
Keep pull request as a mechanism for larger changes that require review, or work over time.
Introduce feature flags to limit the need for pull requests.

## Consequences

Pro's:
- Faster delivery of features
- Faster feedback on changes
- Faster time to fix issues
- Better quality product over time

Con's:
- Requires discipline to ensure that changes are of a certain quality before being pushed
- Takes some getting used to
