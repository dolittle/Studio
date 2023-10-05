// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Checkbox, Form } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Checkbox, {
    actions: { onChange: 'changed' },
    decorator: (Story) => (
        <Form<{ defaultCheckbox: boolean }>
            initialValues={{ defaultCheckbox: true }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    docs: {
        description: {
            component: `A checkbox is an input control that allows a user to select one or more options from a number of choices, 
including sub-selections, or to turn an item on or off in a desktop environment. Checkboxes should be used instead of switches if multiple options can be selected from a list. 
There are three variants of a checkbox: selected, unselected, and indeterminate. Always provide a succinct, yet clear label, as to what the checkbox is for. If only one selection is allowed, use a radio button instead.

**Parent and child checkboxes:**
When the parent checkbox is checked, all child checkboxes are checked. If the parent checkbox is unchecked, all child checkboxes become unchecked. If some child checkboxes are checked, but not all, the parent
checkbox becomes an indeterminate checkbox. 

**Required checkboxes:** 
If a user is required to select at least one option from a list, be sure to include an asterisk (*) on the parent label.

**Disabled checkboxes:**
Disabled checkboxes can be selected, unselected or indeterminate. Disable a checkbox when the user should not have the option to select or deselect the item. 
Consider offering a reason as to why the checkbox is disabled with a hover tooltip if it is not obvious in the UI or the user might benefit from the understanding.` },
    },
    controls: { include: ['id', 'label', 'disabled', 'required'] },
};

metadata.argTypes = {
    disabled: {
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        description: 'Mart as `true` if the checkbox is required.',
        control: { type: 'boolean' },
        table: { defaultValue: { summary: 'false' } },
    },
};

metadata.args = {
    id: 'defaultCheckbox',
    label: 'Default checkbox with label',
    disabled: false,
    required: false,
};

export default metadata;

export const Default = createStory();
