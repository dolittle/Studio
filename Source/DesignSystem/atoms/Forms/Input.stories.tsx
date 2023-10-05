// Copyright (c) Aigonix. All rights reserved.
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
    docs: {
        description: {
            component: `By default, we use an outlined input field with a label. Labels should make it easy for the user
to understand the requested information and to address any errors.

**Helper text:** Helper text should not repeat the label but, rather, provide additional guidance about the input field. It should only take up a single line below the field. Helper text should only be added when it can provide more value.

**Error text:** Error text, like helper text, should display instructions on how to fix the error and only take up a single line below the field. When an input field has an error, it should render an error state in the main error color.

**Icons:** Icons in text fields are optional and, if used, should provide additional functionality, not decoration. Examples include, a drop down arrow to expand the options (this is a 'Select' component), an 'X' icon to clear the input or an '!' icon to indicate an error.

**Prefix and suffix text:** Include a prefix or suffix in fields when it makes sense. Examples include a '$' symbol at the beginning when the user must input a monetary value or 'kgs' at the end when a user must enter a weight value.

**Layout:** Input fields should expand with fluid layouts but never fill an entire width of a large screen. Take care to keep alignment on text fields where it makes sense and shorten fields where appropriate. For example, an input field for abbreviated state names such as AL, AK, AZ, AR, etc.. can be shortened. However, an input field for first and last name will be longer and should maintain the same width as each other.` },
    },
    controls: { include: ['id', 'label', 'autoFocus', 'startAdornment', 'placeholder', 'disabled', 'required', 'pattern', 'isFullWidth'] },
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
        description: 'Can be a `boolean` or a `string` with a custom message.',
        control: { type: 'boolean' },
        table: { defaultValue: { summary: 'false' } },
    },
    pattern: {
        description: `Add custom regex validation. <br/> The value can be a \`string\` or an \`object\` with a value and a custom error message.`,
        options: ['Email', 'Password'],
        mapping: {
            Email: emailRegex,
            Password: passwordRegex,
        },
    },
    isFullWidth: {
        description: 'If true, the `Input` element will take up the full width of its container.',
        control: { type: 'boolean' },
        table: { defaultValue: { summary: 'false' } },
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
    isFullWidth: false
};

export default metadata;

export const Default = createStory();

export const Required = createStory({
    id: 'requiredInput',
    label: 'Required input',
    required: true,
});
Required.parameters = {
    docs: {
        description: {
            story: `Always include an asterisk (*) on the label when input is required from the user.
            Alternatively, you can leave out the asterisk IF all fields are required and only a few are optional.
            In this case, include the type (optional) in the label. This is only recommended in familiar tasks where users expect certain information to be required,
            such as a signup or checkout process.`
        },
    },
};

export const RequiredWithCustomMessage = createStory({
    id: 'requiredInputWithCustomMessage',
    label: 'Custom required message',
    required: 'You can provide a custom message string here.',
});

export const RequiredWithCustomRegexPattern = createStory({
    id: 'requiredWithCustomRegexPattern',
    label: 'Custom regex pattern',
    pattern: {
        value: emailRegex,
        message: 'Only lowercase letters and numbers are allowed.',
    },
    required: true,
});

//TODO: change styling and name to disabled
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
            tooltipTitle='Title'
            tooltipText='Use this tooltip to provide additional information about the input.'
        >
            {Story()}
        </Tooltip>
    ),
];

export const WithMultiline = createStory({
    id: 'withMultiline',
    label: 'With multiline',
    multiline: true,
    rows: 5,
});

export const WithFullWidth = createStory({
    id: 'withFullWidth',
    label: 'With full width',
    isFullWidth: true,
});
