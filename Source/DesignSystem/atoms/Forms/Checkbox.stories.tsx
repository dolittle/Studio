// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Checkbox, Form } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Checkbox, {
    actions: {
        onChange: 'changed',
    },
    decorator: (Story) => (
        <Form initialValues={{
            defaultCheckbox: false,
        }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    controls: { include: ['id', 'label', 'disabled', 'required', 'onChange'] },
};

metadata.argTypes = {
    disabled: {
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        control: { type: 'boolean' },
        table: { defaultValue: { summary: 'false' } },
    },
};

metadata.args = {
    id: 'defaultCheckbox',
    label: 'Default checkbox with label',
    disabled: false,
    required: true,
};

export default metadata;

export const Default = createStory();
