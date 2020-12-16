# TSConfig.json

All projects need a `tsconfig.json` file. This file instructs the TypeScript transpiler with the compiler options, how to output things
and what referenced projects it needs. The project references are important as they tell something about the dependencies the project
has and also instructs the compiler to build these other projects as part of building the end result.

> References to other projects are relative path to the `tsconfig.json` file.

The compiler options, rules and common settings are all defined as a shared tile in the root of the repository; [tsconfig.json](../tsconfig.json).
You should add a reference to this using the `extends` key of the `tsconfig.json` file - the path is relative to the path of your `tsconfig.json`
file.

```json
{
    "extends": "../../../tsconfig.json",
    "references": [
        {
            "path": "../../Shared/Backend"
        },
        {
            "path": "../../Shared/DependencyInversion"
        }
    ]
}
```

> You **should not** have project references from one microservice to another.
> If there is something shared, consider formalizing its abstraction and put it in the right **Shared** project

## Path aliases

The [tsconfig.json](../tsconfig.json) at the root level also configures aliases for paths. The reason for this is to aid the tools, such as VSCode
to give the correct import statement suggestions during auto import or quick fixes.

> This applies only to shared projects. If you add a shared project, you'll have to add a similar path alias as below.

```json
{
    "compilerOptions": {
        "paths": {
            "@shared/backend*": ["Source/Shared/Backend*"],
            "@shared/dependencyinversion*": ["Source/DependencyInversion*"],
            "@shared/mvvm*": ["Source/MVVM*"],
            "@shared/portal*": ["Source/Portal*"],
            "@shared/styles*": ["Source/Styles*"],
            "@shared/web*": ["Source/Web*"],
            "@shared/WebPack*": ["Source/WebPack*"]
        }
    }
}
```
