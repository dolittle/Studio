# Prerequisites

The solution and its microservices are built on top of [NodeJS](https://nodejs.org/en/). You'll need to get a version that is higher than 13.7,
since we're leveraging features introduced in that version.
Its primary language is [TypeScript](https://www.typescriptlang.org) and using [Yarn](https://yarnpkg.com) as the package
manager. You should also make sure you have [Docker](https://www.docker.com/products/container-runtime) installed.

The Docker engine should be in Linux mode, as we're not targeting Windows containers.

All build scripts and dependencies set up has been tested on:

* Windows
* macOS
* Linux

It is however recommended to consider using the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
