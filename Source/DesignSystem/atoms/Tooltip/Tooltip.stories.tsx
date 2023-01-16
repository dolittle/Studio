// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form, Tooltip } from '@dolittle/design-system';

import { Input } from '../Forms';

const { metadata, createStory } = componentStories(Tooltip, {
    decorator: (Story) => (
        <Form
            initialValues={{
                default: ''
            }}
            sx={{ mt: 2 }}
        >
            <Story />
        </Form>
    )
});

metadata.argTypes = {
    children: {
        control: {
            disable: true
        }
    },
    disableHoverListener: {
        control: {
            disable: true
        }
    },
    placement: {
        control: {
            disable: true
        }
    }
};

metadata.parameters = {
    docs: {
        source: {
            code: `
<Tooltip 
    id='tooltip' 
    tooltipTitle='Default tooltip'
    tooltipText='This is example text for the right aligned focused Input field tooltip.'
    >
    <Input id='input' label='Click to focus...' />
</Tooltip>
`
        }
    }
};

export default metadata;

export const Default = createStory({
    id: 'default',
    tooltipTitle: 'Default tooltip',
    tooltipText: 'This is example text for the right aligned focused Input field tooltip.',
    children: <Input id='default' label='Click to focus...' />
});
