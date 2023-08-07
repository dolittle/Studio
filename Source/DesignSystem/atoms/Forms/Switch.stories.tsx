// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories } from '../../componentStories';
import { Form, Switch } from './';

const { metadata, createStory } = componentStories(Switch, {
    actions: { onChange: 'Changed' },
    decorator: (Story) => (
        <Form<{ default: string }>
            initialValues={{
                default: '',
            }}
        >
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    docs: {
        description: {
            component: `Switches toggle the state of a single setting on or off. They are the preferred way to adjust settings on mobile. If the user has several items to select on or off for, consider
using checkboxes on desktop. Clearly indicate with the label what will happen when the user toggles it on or off. On switches should always use the primary color. Off switches should use the inherit color.` },
    },
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
