// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { action } from '@storybook/addon-actions';

import { componentStories, IconButton, TextField } from '../../index';

const { metadata, createStory } = componentStories(TextField);

export default metadata;

metadata.title = 'Text Field';

metadata.parameters = {
    docs: {
        description: {
            component: 'Text fields allow users to enter text into a UI.',
        },
    },
};

metadata.argTypes = {
    value: { control: false },
    onValueChange: { control: false },
    sx: { control: false },
    overrides: { control: false },
};

metadata.args = {
    id: 'text-field',
    label: '',
    size: 'small',
    placeholder: '',
    helperText: '',
    isDisabled: false,
    isFullWidth: false,
    isRequired: false,
    iconColor: 'inherit',
    onValueChange: action('Value changed!'),
};

export const Default = createStory();

export const Overrides = createStory({
    overrides: {
        InputProps: {
            endAdornment:
                <IconButton tooltipText='This is an added action button.' icon='AddBoxRounded' onClick={action('IconButton was clicked!')} />,
        },
    },
});
