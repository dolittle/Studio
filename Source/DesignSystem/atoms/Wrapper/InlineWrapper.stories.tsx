// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, InlineWrapper } from '../../index';

const { metadata, createStory } = componentStories(InlineWrapper);

metadata.title = 'Wrapper/Inline Wrapper';

metadata.parameters = {
    docs: {
        description: {
            component: `A box that displays its children inline.`,
        },
    },
};

metadata.argTypes = {
    children: { control: false },
    sx: { control: false },
};

metadata.args = {
    children: (
        <>
            <div>First</div>
            <div>Second</div>
            <div>Third</div>
        </>
    )
};

export default metadata;

export const Default = createStory();
