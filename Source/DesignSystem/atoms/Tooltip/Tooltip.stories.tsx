// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form, Input, Tooltip } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Tooltip, {
    decorator: (Story) => (
        <Form<{ default: string }>
            initialValues={{ default: '' }}
            sx={{ mt: 2 }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    controls: { include: ['id', 'tooltipTitle', 'tooltipText'] }
};

metadata.argTypes = {
    tooltipText: { control: { type: 'text' } },
};

metadata.args = {
    id: 'default',
    tooltipTitle: 'Default tooltip',
    tooltipText: 'This is example text for the right aligned focused Input field.',
    children: <Input id='default' label='Click to focus...' />
};

export default metadata;

export const Default = createStory();
