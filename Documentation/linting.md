# Linting

All TypeScript projects **should** be using linting and use the ruleset configured at the root of this
repository. The purpose of linting is:

1. Catch common errors through static code analysis
2. Consistency in the codebase

## ESLint

ESLint is being used to do this, at the root of the project you'll find [.eslintrc.js](../.eslintrc.js)
which holds the configuration with all the rules.

It is possible to ignore certain files or folders, for instance artifacts that are being leveraged by specs.
If we want it to be a global ignore, we do this in the [.eslintrc.js](../eslintrc.js) file.
Read more [here](https://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories).

## Package.json

In the package.json file there should be a script for doing lint. This should also be part of what gets
done during a continuous integration build.

By adding the following in the `scripts`, one can run `yarn lint` at any time and it will also perform
quick fixes.

```json
{
   "scripts": {
      "lint": "eslint '**/*.{js,ts,tsx}' --quiet --fix",
      "lint:ci": "eslint '**/*.{js,ts,tsx}' --quiet"
   }
}
```

> Notice there are 2 different lint scripts. One for the CI and one for local. The point of this is that the local one
> is set up to perform any fixes. We don't want the CI pipeline to perform these and hide any issues, since it doesn't
> commit it back.

## VSCode extensions

It is highly recommended to install all helper extensions for lint purposes. That will highlight any issues while you're
working. Have a look at the [vscode](./vscode.md) page for list of recommended extensions.
