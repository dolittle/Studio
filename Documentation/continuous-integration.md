# Continuous Integration

The purpose of the continuous integration is to integrate code as often as possible by compiling, running static code analysis and
any automated tests / specs associated with the code that changes. This to avoid any regressions and catch errors as early as possible.

Every time a commit is pushed to any of the branches the GitHub actions will build the microservice affected based on the path filter.
This is defined by the `build-{microservice}.yml` -file. Let's look at one of these files (as it looks when this is written):

```yml
name: Build eCommerce Connector

on:
  push:
    branches:
    - '**'
    paths:
    - 'Source/Applications/**'                             # Path filter for the build. We only want to react on changes in our microservice
    - 'Source/Shared/**'                                # ... and any of the shared components

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Setup node
      uses: actions/setup-node@v1
      with:
        node-version: '14.2'
        registry-url: 'https://registry.npmjs.org'

    - name: Build
      run: |
        export NODE_OPTIONS="--max-old-space-size=4096"
        yarn
        cd Source/eCommerce/Backend
        yarn ci
```

For those microservices with a frontend, the build job needs to also include it:

```yml
    - name: Build
      run: |
        export NODE_OPTIONS="--max-old-space-size=4096"
        yarn
        cd Source/Harvest/Backend
        yarn ci
        cd ../Web
        yarn ci
```

> Note the `NODE_OPTIONS` being set. This is because some of the tooling requires more memory than default.

Here we define the name of the action, and that it runs on every push of any branch. The job it runs has three steps, and runs on `ubuntu-latest`:
1. check out the code
2. setup node (as these are node-based microservices)
3. build the micorservice (this may vary a bit between microservices, but usually ends up with `yarn ci`, and hopefully also `yarn test` to run any automated tests)

This build is a check that the code builds (and tests work), and does not result in any artifacts.
