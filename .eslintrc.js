// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const allowTsxPascalParameters =
    require('@dolittle/eslint-config')
        .rules['@typescript-eslint/naming-convention']
        .map(option => {
            if (option.selector !== 'parameter') return option;
            const { format, ...rest } = option;
            return {
                format: [...format, 'PascalCase'],
                ...rest,
            };
        });

module.exports = {
    extends: [
        '@dolittle',
        'plugin:react/recommended'
    ],
    root: true,
    parserOptions: {
        project: './Sources/*/tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        '@typescript-eslint/unified-signatures': 'off',
        'import/no-extraneous-dependencies': 'off',
        'eol-last': 'error',
        // 'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
        'header/header': [
            2,
            'line',
            [
                ' Copyright (c) Aigonix. All rights reserved.',
                ' Licensed under the MIT license. See LICENSE file in the project root for full license information.',
            ],
        ],
        'jsdoc/require-param-name': 'error',
        // 'jsdoc/require-param-type': 'error',
        'jsdoc/check-alignment': 'error',
        // 'jsdoc/check-indentation': 'error',
        'jsdoc/valid-types': 'error',
        // 'jsdoc/require-hyphen-before-param-description': 'error',
        'jsdoc/check-line-alignment': 'error',
        'jsdoc/require-returns-check': 'error',
        'jsdoc/require-returns-description': 'error',
        // 'jsdoc/require-returns-type': 'error',
        'jsdoc/check-tag-names': 'error',
        'jsdoc/check-param-names': 'error',
        'jsdoc/check-types': 'error',
        'jsdoc/empty-tags': 'error',
        'jsdoc/no-bad-blocks': 'error',
        'jsdoc/no-undefined-types': 'error',
        'jsdoc/multiline-blocks': 'error',
        'jsdoc/no-multi-asterisks': 'error',
        'jsdoc/require-asterisk-prefix': 'error',
        // 'jsdoc/require-description-complete-sentence': 'error',
        // 'jsdoc/require-param': 'error',
        // 'jsdoc/require-param-description': 'error',
        'jsdoc/tag-lines': ['error', 'always', { count: 0 }],
        // 'jsdoc/require-jsdoc': ['error', {
        //     require: {
        //         FunctionDeclaration: false
        //     },
        //     contexts: [
        //         'ExportNamedDeclaration>TSTypeAliasDeclaration',
        //         'ExportNamedDeclaration>TSInterfaceDeclaration',
        //         'ExportNamedDeclaration>ClassDeclaration',
        //         'ExportNamedDeclaration[declaration.type="TSDeclareFunction"]:not(ExportNamedDeclaration[declaration.type="TSDeclareFunction"] + ExportNamedDeclaration[declaration.type="TSDeclareFunction"])',
        //         'ExportNamedDeclaration[declaration.type="FunctionDeclaration"]:not(ExportNamedDeclaration[declaration.type="TSDeclareFunction"] + ExportNamedDeclaration[declaration.type="FunctionDeclaration"])',
        //         'MethodDefinition[accessibility!="private"][value.type="TSEmptyBodyFunctionExpression"]:not(MethodDefinition[value.type="TSEmptyBodyFunctionExpression"] + MethodDefinition[value.type="TSEmptyBodyFunctionExpression"])',
        //         'MethodDefinition[accessibility!="private"][value.type="FunctionExpression"]:not(MethodDefinition[value.type="TSEmptyBodyFunctionExpression"] + MethodDefinition[value.type="FunctionExpression"])',
        //     ]
        // }],
        // 'jsdoc/require-returns': ['error', {
        //     contexts: [
        //         'ArrowFunctionExpression',
        //         'FunctionDeclaration',
        //         'MethodDefinition[kind!="get"]'
        //     ]
        // }],
        // 'jsdoc/require-description': ['error', {
        //     descriptionStyle: 'body',
        //     contexts: ['any']
        // }],

        // Rules that are temoprarily disabled

        // This is nice - but makes the linter horribly slow
        // 'jsdoc/match-description': ['error', {
        //     matchDescription: '^(?:[^\\{]+|\\{@link [^\\}]+\\})+$',
        //     tags: {
        //         param: true
        //     },
        //     message: 'Descriptions must use {@link ...} for references to other types.'
        // }],
    },
    overrides: [
        {
            files: ['**.tsx'],
            rules: {
                '@typescript-eslint/naming-convention': allowTsxPascalParameters,
            },
        },
        {
            files: ['**/for_*/**'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
                'import/no-extraneous-dependencies': 'off',
                '@typescript-eslint/no-unused-expressions': 'off',
                'no-restricted-globals': 'off',
                'jsdoc/require-jsdoc': 'off',
            },
        },
    ],
};
