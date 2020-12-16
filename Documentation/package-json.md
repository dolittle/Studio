# Package.json

The `package.json` file should be set to be a private package. We're not going to release this on npmjs.org.
Its license should also be set to unclicensed, as this is not an open source library. Version can be statically set to '1.0.0'.
The name of the package should reflect the name of the microservice and every package; Backend, Web should then be postfixing the
name for its concern (e.g. **mymicroservice.backend**, **mymicroservice.web**).

> When using Yarn/NPM workspaces it is important to remember that the package name needs to be globally unique across the workspace
> Therefor we follow the convention of naming the packages as '(microservice name).(concern)'.

The initial `package.json` should be looking something like this:

```json
{
    "name": "mynewmicroservice.backend",
    "version": "1.0.0",
    "private": true,
    "license": "UNLICENSED"
}
```

> Make note that the package is set to `"private": true` - this is to make sure we don't publish the package to NPM unless it is a private NPM registry.
