# Shared Projects

In the [`Source`](../Source) folder you'll find a folder called [`Shared`](../Source/Shared).
Within here you'll find shared infrastructure - things that are common setup, typically the glue.

> **IMPORTANT** You *should not* put domain specific things in this place. That creates couplings between microservices on a domain level.

## TSConfig Project References

Every shared project should have a TSConfig.json project file, as all [others](./tsconfig-json.md).
The projects don't need to have a output directory, as since we're using `ts-node` during development, the output
is built by it. For production builds, it will recursively build and get the output for the WebPack process.

> The `outDir` is specified at the root `tsconfig.json` file. This is done for all tooling to work consistently.
> With a default configuration of `tsconfig.json`, VSCode for instance will resolve shared components to the `outDir`.
> This can be fixed by using the `"disableSourceOfProjectReferenceRedirect": true` in `tsconfig.json`, but it
> renders auto-imports and quick fixes for import statements in VScode.

```json
{
    "extends": "../../../tsconfig.json",
    "references": [
        { "path": "../DependencyInversion" }
    ]
}
```

## Root Package.json

At the root level there is a [package.json](../package.json) that describes the [workspace](./workspaces.md).

```json
{
    "dependencies": {
        "@shared/backend": "*"
    }
}
```
