// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Search } from '@mui/icons-material';

import { componentStories, Form, Input, Tooltip } from '@dolittle/design-system';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

type StoriesValuesProps = {
    defaultInput: string;
    requiredInput: string;
    requiredInputWithCustomMessage: string;
    requiredWithCustomRegexPattern: string;
    dashedInput: string;
    withSideTooltip: string;
};

const { metadata, createStory } = componentStories(Input, {
    actions: { onChange: 'changed' },
    decorator: (Story) => (
        <Form<StoriesValuesProps>
            initialValues={{
                defaultInput: '',
                requiredInput: '',
                requiredInputWithCustomMessage: '',
                requiredWithCustomRegexPattern: '',
                dashedInput: '',
                withSideTooltip: 'Click to see tooltip...',
            }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    controls: { include: ['id', 'label', 'autoFocus', 'startAdornment', 'placeholder', 'disabled', 'required', 'pattern', 'onChange'] },
};

metadata.argTypes = {
    autoFocus: {
        table: { defaultValue: { summary: 'false' } },
    },
    startAdornment: {
        options: ['Path', 'Search'],
        mapping: {
            Path: '/',
            Search: <Search />,
        },
    },
    disabled: {
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        control: { type: 'boolean' },
        table: { defaultValue: { summary: 'false' } },
    },
    pattern: {
        options: ['Email', 'Password'],
        mapping: {
            Email: emailRegex,
            Password: passwordRegex,
        },
    },
};

metadata.args = {
    id: 'defaultInput',
    label: 'Default input',
    autoFocus: false,
    placeholder: undefined,
    startAdornment: undefined,
    disabled: false,
    required: false,
    pattern: undefined,
};

export default metadata;

export const Default = createStory();

export const Required = createStory({
    id: 'requiredInput',
    label: 'Required input',
    required: true,
});

export const RequiredWithCustomMessage = createStory({
    id: 'requiredInputWithCustomMessage',
    label: 'Custom required message',
    required: 'You can provide a custom message string here.',
});

export const RequiredWithCustomRegexPattern = createStory({
    id: 'requiredWithCustomRegexPattern',
    label: 'Custom regex pattern',
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    required: 'Only lowercase letters and numbers are allowed.',
});

export const WithDashedBorder = createStory({
    id: 'dashedInput',
    label: 'With dashed border',
    dashedBorder: true,
});

export const WithSideTooltip = createStory({
    id: 'withSideTooltip',
    label: 'With side tooltip',
});
WithSideTooltip.decorators = [
    (Story) => (
        <Tooltip
            id='inputTooltip'
            tooltipTitle='Title'
            tooltipText='Use this tooltip to provide additional information about the input.'
        >
            {Story()}
        </Tooltip>
    ),
];
