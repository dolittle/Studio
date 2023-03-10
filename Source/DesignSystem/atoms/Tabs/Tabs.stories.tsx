// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Tabs } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Tabs);

metadata.parameters = {
    controls: { include: [] },
    docs: {
        source: {
            code: `
tabs: [
        {
            label: 'First tab',
            render: () => <h1>Hello</h1>
        },
        {
            label: 'Second tab',
            render: () => <h1>World</h1>
        },
        {
            label: 'Third tab',
            render: () => <h1>Hello World!</h1>
        },
]`
        },
    },
};

export default metadata;

export const Normal = createStory({
    tabs: [
        {
            label: 'First tab',
            render: () => <h1>Hello</h1>
        },
        {
            label: 'Second tab',
            render: () => <h1>World</h1>
        },
        {
            label: 'Third tab',
            render: () => <h1>Hello World!</h1>
        },
    ]
});
