# Aigonix Design System

The Aigonix design system is built to support the product development work of the Aigonix Studio product.
It is a design system built around components that use the MUI component framework for React.

View the Storybook site to see the currently supported components: https://design.dolittle.io

## Installing in your project
The design system is currently only made available to other projects in the Studio monorepo, but will soon be available through npm for other projects to consume.

## Working with the Design System
### Prerequisites
**Latest node LTS**
Install the latest node LTS from https://nodejs.org/en/download, or install NVM (Node Version Manager - https://github.com/nvm-sh/nvm) to allow you to switch node versions as needed (recommended).

### Install dependencies
From the root of the project, install dependencies by running; `yarn`.

### Build
To build the component library, run `yarn build`from the DesignSystem directory. The output will be placed in a folder called `./dist`.

### Storybook
Documenting and working with the components can be done using Storybook. To build and watch this run `yarn start:dev`. This will start Storybook on localhost:6006

## Publish to NPM
Coming soon