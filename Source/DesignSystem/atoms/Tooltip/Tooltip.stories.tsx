// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form, Tooltip } from '@dolittle/design-system';

import { Input } from '../Forms';

const { metadata, createStory } = componentStories(Tooltip, {
    decorator: () => (
        <Form
            initialValues={{
                default: ''
            }}
            sx={{ mt: 2 }}
        >
            <Input
                id='default'
                label='Click to focus...'
                tooltipTitle='Default tooltip'
                tooltipText='This is example text for the right aligned focused Input field tooltip.'
            />
        </Form>
    )
});

metadata.parameters = {
    controls: {
        include: []
    }
};

export default metadata;

export const Default = createStory({
    id: 'default',
    tooltipTitle: 'Default tooltip',
    tooltipText: 'This is example text for the right aligned focused Input field tooltip.'
});
