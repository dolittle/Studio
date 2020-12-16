# Workspaces

At the root of the repository sits a `package.json` file that represents the common things and
the setup for workspaces. With npm / yarn workspaces we get a shared `node_modules` folder.
It also provide a nice automatic way of setting up npm/yarn links between projects, for instance our
[shared projects](./shared-projects.md).

This "global" package file is considered private, the same as with all the other [package.json](./package-json.md) files.

## Worksace folders

Within the "global" package definition we add the folders for all things that should be considered as part of this
node setup. This means that all projects that should be part of sharing the same `node_modules` and be automatically
npm/yarn linked. This applies only to node projects; those that has a `package.json` file themselves.

You'll find it in the `"workspaces"` key:

```json
{
    "workspaces": {
        "Source/Harvest/Backend",
        ...
    }
}
```

All you need to do is add your project to this.

> It is possible to add * wildcards at the end of a folder to include all folders.

## Shared Projects

In this file we also reference the shared projects as package dependencies. We do this to make sure all tooling works
as smooth as possible. Read more [here](./shared-projects.md).
