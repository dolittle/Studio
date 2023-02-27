// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form, Select } from '@dolittle/design-system';

type SelectFormParameters = {
    defaultSelect: string;
    withDashedBorder: string;
};

const selectOptions = [
    { value: 'Value 1', displayValue: 'Value 1' },
    { value: 'Value 2', displayValue: 'Value 2' },
    { value: 'Value 3', displayValue: 'Value 3' },
];

const { metadata, createStory } = componentStories(Select, {
    actions: { onChange: 'Value changed' },
    decorator: (Story) => (
        <Form<SelectFormParameters>
            initialValues={{
                defaultSelect: 'Value 1',
                withDashedBorder: 'Value 2',
            }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    controls: { include: ['id', 'label', 'options', 'defaultValue', 'disabled', 'required'] },
};

metadata.argTypes = {
    options: { control: false },
    required: {
        control: { type: 'boolean' },
    },
};

metadata.args = {
    id: 'defaultSelect',
    label: 'Default select',
    options: selectOptions,
    disabled: false,
    required: false,
};

export default metadata;

export const Default = createStory();

export const WithDashedBorder = createStory({
    id: 'withDashedBorder',
    label: 'With dashed border',
    options: selectOptions,
    sx: { '& fieldset': { borderStyle: 'dashed' } },
});
