// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Tabs } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Tabs);

metadata.parameters = {
    controls: { include: [] },
    docs: {
        description: {
            component: `Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy. 
                        Only one tab can be active at a time. The left most tab is activated by default when a user visits a page with tabs. 
                        Keep tab labels between one to two words at most. They should be descriptive enough to let the user know what content is contained within that tab.`
        },
    },
};

export default metadata;

export const Default = createStory({
    tabs: [
        {
            label: 'First tab',
            render: () => <h1>Hello</h1>,
        },
        {
            label: 'Second tab',
            render: () => <h1>World</h1>,
        },
        {
            label: 'Third tab',
            render: () => <h1>Hello World!</h1>,
        },
    ],
});
