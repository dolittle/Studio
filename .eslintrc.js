// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

module.exports = {
    root: true,
    ignorePatterns: [
        '*.d.ts',
        '*.scss.d.ts',
        'tsconfig.*',
        'wallaby.js',
        'dist',
        'node_modules',
        'wwwroot'
    ],
    extends: [
        'plugin:react/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './Source/**/tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: false,
        node: true,
        es6: true,
        mocha: true
    },
    plugins: [
        '@typescript-eslint', 'header', 'jsdoc', 'no-null', 'import'
    ],
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        "@typescript-eslint/no-this-alias": ['error', { allowedNames: ['self'] }],
        'import/no-extraneous-dependencies': 'off',

        'camelcase': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'typeLike', format: ['PascalCase'], filter: { regex: '^(__String|[A-Za-z]+_[A-Za-z]+)$', match: false } },
            { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: true }, filter: { regex: '^I(Arguments|TextWriter|O([A-Z][a-z]+[A-Za-z]*)?)$', match: true } },
            { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'], leadingUnderscore: 'allow', filter: { regex: '^(_{1,2}filename|_{1,2}dirname|_+|[A-Za-z]+_[A-Za-z]+)$', match: false } },
            { selector: 'function', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow', filter: { regex: '^[A-Za-z]+_[A-Za-z]+$', match: false } },
            { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow', filter: { regex: '^(_+|[A-Za-z]+_[A-Z][a-z]+)$', match: false } },
            { selector: 'method', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow', filter: { regex: '^[A-Za-z]+_[A-Za-z]+$', match: false } },
            { selector: 'memberLike', format: ['camelCase'], leadingUnderscore: 'allow', filter: { regex: '^[A-Za-z]+_[A-Za-z]+$', match: false } },
            { selector: 'enumMember', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow', filter: { regex: '^[A-Za-z]+_[A-Za-z]+$', match: false } },
            // eslint-disable-next-line no-null/no-null
            { selector: 'property', format: null }
        ],

        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-this-alias': 'error',

        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],

        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',

        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

        'semi': 'off',
        '@typescript-eslint/semi': 'error',

        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': ['error', {
            asyncArrow: 'always',
            anonymous: 'always',
            named: 'never'
        }],

        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',

        // eslint-plugin-header
        'header/header': [
            2,
            'line',
            [
                ' Copyright (c) Dolittle. All rights reserved.',
                ' Licensed under the MIT license. See LICENSE file in the project root for full license information.'
            ]
        ],

        // eslint-plugin-jsdoc
        'jsdoc/check-alignment': 'error',

        // eslint
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'constructor-super': 'error',
        'curly': ['error', 'multi-line'],
        'dot-notation': 'error',
        'eqeqeq': ['error', 'smart'],
        'new-parens': 'error',
        'no-caller': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        'no-fallthrough': 'error',
        'no-new-wrappers': 'error',
        'no-return-await': 'error',
        'no-restricted-globals': ['error',
            { name: 'setTimeout' },
            { name: 'clearTimeout' },
            { name: 'setInterval' },
            { name: 'clearInterval' },
            { name: 'setImmediate' },
            { name: 'clearImmediate' }
        ],
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        'space-in-parens': 'error',
        'unicode-bom': ['error', 'never'],
        'use-isnan': 'error'
    },
    overrides: [
        {
            files: ['**/for_*/**'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
                '@typescript-eslint/no-unused-expressions': 'off',
                'no-restricted-globals': 'off',
            }
        }
    ]
};
