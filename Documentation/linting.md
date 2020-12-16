# Linting

All TypeScript projects **should** be using linting and use the ruleset configured at the root of this
repository. The purpose of linting is:

1. Catch common errors through static code analysis
2. Consistency in the codebase

## ESLint

ESLint is being used to do this, at the root of the project you'll find [.eslintrc.js](../.eslintrc.js)
which holds the configuration with all the rules.

It is possible to ignore certain files, for instance artifacts that are being leveraged by specs.

## Package.json

In the package.json file there should be a script for doing lint. This should also be part of what gets
done during a continuous integration build.

By adding the following in the `scripts`, one can run `yarn lint` at any time and it will also perform
quick fixes.

```json
{
   "scripts": {
      "lint": "eslint '*/**/*.{js,ts,tsx}' --quiet --fix",
      "ci": ""
   }
}
```

## VSCode extensions

## VSCode configuration