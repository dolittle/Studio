// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

module.exports = {
    root: true,
    ignorePatterns: [
        'node_modules',
    ],
    parser: 'espree',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    env: {
        node: true,
        es6: true,
    },
    plugins: [
        'header',
    ],
    rules: {
        // eslint-plugin-header
        'header/header': [
            2,
            'line',
            [
                ' Copyright (c) Aigonix. All rights reserved.',
                ' Licensed under the MIT license. See LICENSE file in the project root for full license information.'
            ]
        ],



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
    }
}
