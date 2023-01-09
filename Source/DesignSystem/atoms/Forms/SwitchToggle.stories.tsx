// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form } from '@dolittle/design-system';

import { SwitchToggle } from './SwitchToggle';

const { metadata, createStory } = componentStories(SwitchToggle, {
    actions: {
        onChange: 'Changed',
    },
    decorator: (Story) => (
        <Form initialValues={{
            default: '',
            active: true,
            disabled: '',
            withoutLabel: ''
        }}>
            <Story />
        </Form>
    )
});

export default metadata;

export const Default = createStory({
    id: 'default',
    label: 'Default switch with label'
});

export const Active = createStory({
    id: 'active',
    label: 'Active'
});

export const Disabled = createStory({
    id: 'disabled',
    label: 'Disabled switch',
    disabled: true
});

export const WithoutLabel = createStory({
    id: 'withoutLabel'
});
