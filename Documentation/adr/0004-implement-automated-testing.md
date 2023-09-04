# 4. implement testing

Date: 2023-09-04

## Status

Status: Proposal on 2023-09-04


## Context

Introducing automated testing is a way to improve not only quality of the new features that are implemented, but also to have a regression suite that can be run to ensure that existing functionality is not broken by new changes.
This has happened on several occasions recently, where a new feature has been implemented, and existing functionality has been broken. This is not a good experience for the end-user, and it is also not a good experience for the developer that has to fix the issue.

There are 3 levels of testing that should be implemented. Each has their benefits and drawbacks, and each should be used in the appropriate context.

### Unit testing
Unit testing allows the ability to test parts of the code-base in isolation. Examples of this is to add tests that verify that regex's function as expected. It is also valuable around other areas that decisions are being made in isolation. These should be very fast to run and test.

### React Component testing

#### Single component
A slightly high unit of testing is around React components. Being able to surround tests around the high level behaviour of a component is a way to build new components with confidence, instead of having surprises when loading them in the browser. These tests should not hit any API's, and should be able to run in isolation. Try to avoid hitting parent components with many children as the tests will be harder to set up and maintain.

#### Multiple component tests
It is also possible to set up tests that span several components to address a broader scenario. This is a good way to test the integration between components, and to ensure that the components work together as expected. These tests should not hit any API's, and should be able to run in isolation. The higher up you test, the more brittle the tests may become - so focus on behaviour and not implementation details. Leave the details to specific component level tests.

#### End-to-end testing
Finally there are end-to-end tests that actually DO hit API's and make changes to a system. These tests are usually written from the outside of the system and focus on user behaviour and not the code/implementation of the components. They can be run against a fixed environemnt, or a specifcic customer within an envionment. They can be quite cumbersome to set up the first few tests, but once the infrastructure is in place, they can be quite powerful.

Recommended tools to look into:
- [Jest](https://jestjs.io/) for unit testing
- [React testing library](https://testing-library.com/) for react component testing
- [Playright](https://playwright.dev/) for end-to-end testing

There is a lot of information out there on how to set up these tests, and how to write them. It is recommended to look into these tools and see how they can be used to improve the quality of the code-base.
An attempt to set up a test suite has been made in the following PR: **origin/add-frontend-testing**
The work in the PR focused on unit testing and React component testing. It is not complete because the design system and its dependencies are not set up to be tested in isolation. Refer to ADR: 0003 for more information on this.

## Decision

Implement Jest as unit test runner, and add React testing library for component testing. The tests should be able to run locally and .

## Consequences

**Pro's**
- Improved quality of the code-base
- A test suite that gives confidence when releasing new features
- A security net that can catch regressions
- A metric that can be measured over time to see if the quality of the code-base is improving or not

**Con's**
- Initial time investment to set up the test suite
- Learning curve to understand how to write tests
