# Anatomy of a backend

This document describes the anatomy of a backend.

## Package.json

Within the `Backend` folder there should be a [`package.json`](./package-json.md) file that describes the backend.

### Scripts

Within the `package.json` it is good practice to have the shorthand scripts for being able to run things.
It is also preferable to provide scripts that provide a watch type of workflow. Part of the scripts could be also to provide
scripts for runnings tests (specs - BDD) and to perform linting on the code.
In addition, there should be a way for the Continuous Integration pipelines to build the code.

For a backend, this could typically look like below:

```json
{
    "scripts": {
        "dev": "nodemon --inspect=0 -e ts --exec node -r ts-node/register index.ts",
        "start": "ts-node index.ts",
        "clean": "tsc -b --clean",
        "build": "yarn clean && webpack --env.production --mode=production",
        "test": "mocha",
        "lint": "eslint '**/*.{js,ts,tsx}' --quiet --fix",
        "lint:ci": "eslint '**/*.{js,ts,tsx}' --quiet",
        "ci": "yarn clean && yarn lint:ci && tsc -b && yarn test"
    }
}
```

> Notice there are 2 different lint scripts. One for the CI and one for local. The point of this is that the local one
> is set up to perform any fixes. We don't want the CI pipeline to perform these and hide any issues, since it doesn't
> commit it back.

### Nodemon

As you can see from the scripts above, its using something called [nodemon](https://nodemon.io).
The purpose of this tool is to provide a watch type of workflow, whenever code changes - it automatically restarts and
performs any tasks you want it to perform before it all starts up again.

The configuration itself can sit directly on the `package.json` file. Below is a sample of this that
configures it to watch a couple of folders for changes, ignore the `dist` folder and any declaration files.
In the scripts section, notice the usage of it with `nodemon ./index.ts`.

```json
{
    "nodemonConfig": {
        "restartable": "rs",
        "ignore": [
            "dist",
            "*.d.ts"
        ],
        "execMap": {
            "ts": "ts-node"
        },
        "watch": [
            "./",
            "../../Shared/Backend",
            "../../Shared/DependencyInversion"
        ],
        "ext": "ts"
    }
}
```

## Entrypoint

In the backend you would then have a starting point for the microservice; `index.ts`.
Leveraging the shared backend setup.

```javascript
import path from 'path';
import { startBackend } from '@shared/backend';

import queries from './queries';

(async () => {
    await startBackend({});
})();
```

### Express configuration

If you want to have control over the Express App object, you can add a callback to the argument object
for the `startBackend()` function.

```typescript
await startBackend({
    expressCallback: _ => {
        /* _ is the Express app instance */
    }
});
```

### Dolittle configuration

If you want to have control over the Dolittle client builder, you can add a callback to the argument object

```typescript
await startBackend({
    dolittleCallback: _ => _
        /*
        _ is the Dolittle client builder instance

        this is where you'd start registering things like
        events, projections and more.
        */
    });
});
```

### GraphQL Resolvers

If your Microservice provides queries or mutations for the frontend you can provide resolvers for GraphQL by providing an array of the resolver types.

```typescript
await startBackend({
    graphQLResolvers: [MyFirstResolver, MySecondResolver]
});

A good practice would be to create a file that exports a default array with resolvers and maybe even per category.
Lets say you have queries you want to expose, add a file called `queries.ts`:

```typescript
export default [
    MyFirstQuery,
    MySecondQuery
];
```

Then you'd import this and use it:

```typescript
import queries from './queries';

await startBackend({
    graphQLResolvers: queries
});

If you in addition have mutations, you would do the same thing, add a `mutations.ts`:

```typescript
export default [
    MyFirstMutations,
    MySecondMutations
]
```

And then leverage both in the setup:

```typescript
import queries from './queries';
import mutations from './mutations';

await startBackend({
    graphQLResolvers: [...queries, ...mutations]
});
```

## Config.json

Every Microservice needs unique configuration for them to work.
This configuration is represented in a JSON file called `config.json` that should sit next to your entrypoint.
The values in the config file are overrides from the default and there are more values that can be overridden.
Typically some of the values in the full config is overridden when going to production.

```json
{
    "microserviceId": "81cad113-a001-45dc-86cb-7b1e725ae25e",       <-- Unique identifier of the microservice - corresponding to what is in the microservice.json file in environment
    "routeSegment": "<microservice>",                               <-- Unique route segment to use for the microservice. For frontends it will end up as `/_/<microservice>` and `/_/<microservice>/graphql`. APIs will be at `/api/<microservice>`
    "port": 3003,                                                   <-- The port used for the Web host - must correspond to what is configured in the docker compose in environment
    "dolittle": {
        "runtime": {
            "port": 50059                                           <-- The Dolittle runtime port - must correspond to what is configured in the docker compose in environment
        }
    },
    "database": {
        "name": "<microservice>"                                    <-- Database name to use for the 
    },
    "eventStore": {
        "name": "event_store_<microservice>"                        <-- Event store database name - must correspond to what is set up in the resources.json for the microservice in environment
    }
}
```

> The config system is using [nconf](https://www.npmjs.com/package/nconf) at its core. It has a hierarchy of sources for configuration
> and it is possible to override using both environment variables and arguments for the process. The convention for environment
> variables is that it considers '_' as a separator segment for deep object hierarchies. So for the Dolittle Runtime Port, it is
> expecting the variable to be DOLITTLE_RUNTIME_PORT or dolittle_runtime_port. It is configured to make it lower case when parsing.

The system gets configured with a `Configuration` object that anyone can take a dependency to:

```typescript
import { Configuration } from '@shared/backend`;
import { injectable } from 'tsyringe';

@injectable()
export class MyClass {
    constructor(configuration: Configuration) {
        // Use the configuration properties
    }
}
```

## APIs

I you're providing an API from your backend, the shared infrastructure comes with support for something called [TSOA](https://tsoa-community.github.io/docs/introduction.html#goal).
This enables you to easily create REST based API controllers that automatically generate [swagger](https://swagger.io) documentation.
If you want to leverage this, all you need to do is add a file called `tsoa.json` to your project and configure it like this:

```json
{
    "entryFile": "index.ts",
    "noImplicitAdditionalProperties": "throw-on-extras",
    "controllerPathGlobs": [
        "**/*Controller.ts"
    ],
    "spec": {
      "outputDirectory": "./",
      "specVersion": 3
    },
    "routes": {
        "routesDir": "./",
        "iocModule": "../../Shared/Backend/tsoa/ioc"
    }
}
```

Then update the `dev` script in the `package.json` file to be something like this:

```json
{
    "scripts": {
        "dev": "cross-env NODE_TLS_REJECT_UNAUTHORIZED=0 concurrently \"nodemon -x tsoa spec-and-routes\" \"nodemon index.ts\"",
    }
}
```

This will by convention pick up any files suffixed with **Controller** and generate a file called `routes.ts` and a `swagger.json` file.

In the `index.ts` file we'll need to add a couple of things.
Start by adding the following import statements:

```typescript
import { RegisterRoutes } from './routes';
import * as swaggerDoc from './swagger.json';
```

Within the `startBackend()` call block, you can now add the swagger doc into it:

```javascript
import path from 'path';
import { startBackend } from '@shared/backend';

import { getSchema } from './schema';
import { ProductAdded, ProductHandler } from './configuration';

import { RegisterRoutes } from './routes';
const swaggerDoc = require('./swagger.json');

(async () => {
    const schema = await getSchema();

    await startBackend({
        microserviceId: '08fe9d6d-874e-45d5-b4f6-b31a099645a3',
        prefix: '/_/<microservice>',
        publicPath: './public',
        port: 3003,
        dolittleRuntimePort: 50057,
        graphQLSchema: schema,
        defaultDatabaseName: '<microservice>',
        defaultEventStoreDatabaseName: <microservice-event-store>,
        swaggerDoc,                                               // This is the swagger doc.
        expressCallback: _ => {
            /* _ is the Express app instance */
        },
        dolittleCallback: _ => _
            /*
            _ is the Dolittle client builder instance

            this is where you'd start registering things like
            events, projections and more.
            */
        });
})();
```

With this, you'll now have a new swagger endpoint and all your APIs accessible, prefixed with what you have set as prefix.
You should therefor be able to navigate to the URL e.g. http://localhost:3003/_/mymicroservice/api/swagger.

Read more about TSOA and concrete samples [here](https://tsoa-community.github.io/docs/examples.html).

