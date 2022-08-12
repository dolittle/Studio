// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

module.exports = ({ types: t }) => ({
    visitor: {
        JSXOpeningElement({node}) {
            if (!t.isJSXIdentifier(node.name) || node.name.name !== 'svg') return;

            node.name.name = 'Box';
            node.attributes = [
                t.jsxAttribute(t.jsxIdentifier('component'), t.stringLiteral('svg')),
                ...node.attributes,
                t.jsxSpreadAttribute(t.identifier('props')),
            ];
        },
        JSXClosingElement({node}) {
            if (!t.isJSXIdentifier(node.name) || node.name.name !== 'svg') return;

            node.name.name = 'Box';
        },
    }
});