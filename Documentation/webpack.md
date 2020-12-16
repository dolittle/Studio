# WebPack

We leverage WebPack in this project to package up both frontend and backend.
The purpose of this is to create bundles that are smaller in size than serving a full
set of node modules. WebPack performs a tree shaking that eliminates code that is not
being used.

## Frontend

The frontend has a set of default plugins and rules that allows for using SASS, TypeScript with
React extensions and more.

```javascript
const webpack = require('@shared/webpack/frontend');
module.exports = (env, argv) => {
    return webpack(env, argv, '/_/<microservicename>', config => {
        config.devServer.port = 8083;       // The port of the microservice - unique across the project, aligned with what is configured for the nginx in environments.
    });
};
```

## Backend

When building for deployments we package the solution using WebPack even for the backend.
The benefit of this is that we don't need to package the entire `node_modules` folder along
with our solution code. This yields a much a smaller image.

Another added benefit of this is that startup times are improved dramatically as everything
ends up being a single file that needs to be loaded rather than all the dependencies loaded
on demand as needed.

There is a common pipeline set up for building backends inside the [Shared/WebPack/Backend](../Source/Shared/WebPack/Backend)
folder. To leverage this, all you need is the following `webpack.config.js` file in the
projects folder:

```javascript
const webpack = require('@shared/webpack/backend');

module.exports = (env, argv) => {
    return webpack(env, argv, config => { });
};
```

In the `package.json` file of the project, you typically have the build script that uses this:

```json
{
    "scripts": {
        "build": "yarn clean && webpack --env.production --mode=production"
    }
}
```

This is then used by the [Dockerfile](./dockerfile.md) when building a deployment.

## Metadata for reflection

One thing to keep in mind for the WebPack pipelines is to make sure it does not optimize
away all details that is useful for reflection being done at runtime. For instance, the
[IoC](./ioc.md) leverages reflection metadata that makes it possible for it to make decisions
on what to inject into constructors.

The minimizer needs to be configured properly for this to happen and you'll therefor notice
that the [TerserPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/) is configured
explicitly to keep class and function names intact:

```javascript
    keep_classnames: true,
    keep_fnames: true
```
