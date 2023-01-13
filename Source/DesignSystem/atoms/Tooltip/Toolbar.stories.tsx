// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form } from '@dolittle/design-system';

import { Input } from '../Forms';

const { metadata, createStory } = componentStories(Input, {
    actions: {
        onChange: 'Value changed'
    },
    decorator: (Story) => (
        <Form
            initialValues={{
                default: '',
                withLink: ''
            }}
            sx={{ mt: 2 }}
        >
            <Story />
        </Form>
    )
});

export default metadata;

export const Default = createStory({
    id: 'default',
    label: 'Click to focus...',
    tooltipTitle: 'Default tooltip',
    tooltipText: 'This is example text for the right aligned focused Input field tooltip.'
});

export const withLink = createStory({
    id: 'withLink',
    label: 'Click to focus...',
    tooltipTitle: 'Tooltip with link',
    tooltipText: 'This is example text for the right aligned focused Input field tooltip, that has link.',
    //link: '#',
    //tooltipLink: '#'
});
