// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import Babel, { PluginObj } from '@babel/core';

export default ({ types: t }: typeof Babel): PluginObj => ({
    visitor: {
        JSXOpeningElement({ node }) {
            if (!t.isJSXIdentifier(node.name) || node.name.name !== 'svg') return;

            node.name.name = 'Box';
            node.attributes = [
                t.jsxAttribute(t.jsxIdentifier('component'), t.stringLiteral('svg')),
                ...node.attributes,
                t.jsxSpreadAttribute(t.identifier('props')),
            ];
        },
        JSXClosingElement({ node }) {
            if (!t.isJSXIdentifier(node.name) || node.name.name !== 'svg') return;

            node.name.name = 'Box';
        },
    }
});
