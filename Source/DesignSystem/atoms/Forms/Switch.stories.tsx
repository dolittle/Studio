// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form, Switch } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Switch, {
    actions: { onChange: 'Changed' },
    decorator: (Story) => (
        <Form<{ default: string }>
            initialValues={{ default: '' }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    controls: { include: ['id', 'label', 'defaultValue', 'disabled'] },
};

metadata.argTypes = {
    disabled: {
        table: { defaultValue: { summary: false } },
    },
};

metadata.args = {
    id: 'default',
    label: 'Default switch',
    disabled: false,
};

export default metadata;

export const Default = createStory();
