// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ComponentMeta } from '@storybook/react';

import { Box } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { Button, ButtonProps } from '@dolittle/design-system';

export default {
    title: 'Button',
    component: Button,
    parameters: {
        docs: {
            description: {
                component: `A button triggers an event or action. Its label should let the user know what will happen next.

**Styling:** Buttons come in three style variations. All variations can be used with or without icons to help lift the UI and 
quickly visually communicate to the user what the button will do.

- *Filled buttons* are reserved for primary actions. They should be used to call attention to an action on a form or to 
highlight the strongest call to action on the page. Filled buttons should appear only once per container (not including the 
application header or in a modal dialog). Not every screen requires a primary action, or filled button. Filled buttons use our primary main color. 
- *Outlined buttons* are reserved for login screens. The empty fill allows third-party icons to be used in their original styling. 
- *Text buttons* are used for secondary actions, such as 'cancel' or to carry out an optional action within the page. 
They are commonly found in dialogs, cards or sometimes toolbars. Text buttons may use our primary main color or the inherit color 
of the page depending on whether or not the user's attention should be drawn to the button or if the button needs to be distinguished 
from other content on the page. 
`,
            },
        },
    },
    args: {
        label: 'Default button',
        variant: 'text',
        color: 'primary',
        isFullWidth: false,
        disabled: false,
        type: 'button',
        component: 'button',
    },
    argTypes: {
        variant: {
            control: {
                type: 'radio',
                options: ['text', 'filled', 'outlined'],
            },
        },
        color: {
            control: {
                type: 'radio',
                options: ['primary', 'subtle', 'secondary', 'error', 'info', 'success'],
            },
        },
        startWithIcon: {
            control: false,
            table: {
                type: {
                    summary: 'ReactElement<SvgIconProps>',
                },
            },
        },
        endWithIcon: {
            control: false,
            table: {
                type: {
                    summary: 'ReactElement<SvgIconProps>',
                },
            },
        },
        href: {
            control: false,
        },
        target: {
            control: false,
        },
        ariaLabel: {
            control: false,
        },
        role: {
            control: false,
        },
        onClick: {
            control: false,
        },
        sx: {
            control: false,
        },
    },
} as ComponentMeta<typeof Button>;

export const Default = ({ ...args }: ButtonProps) => (
    <Button {...args} />
);

export const Text = () => (
    <>
        <Button label='primary' />
        <Button label='subtle' color='subtle' />
        <Button label='disabled' disabled />
        <br />
        <Button label='start with icon' startWithIcon={<AddCircle />} />
        <Button label='end with icon' endWithIcon={<AddCircle />} />
    </>
);
Text.decorators = [Story => <Box sx={{ '& button': { mr: 3, mb: 1 } }}>{Story()}</Box>];

export const Filled = () => (
    <>
        <Button label='primary' variant='filled' />
        <Button label='subtle' variant='filled' color='subtle' />
        <Button label='disabled' variant='filled' disabled />
        <br />
        <Button label='start with icon' variant='filled' startWithIcon={<AddCircle />} />
        <Button label='end with icon' variant='filled' endWithIcon={<AddCircle />} />
    </>
);
Filled.decorators = [Story => <Box sx={{ '& button': { mr: 3, mb: 3 } }}>{Story()}</Box>];

export const Outlined = () => (
    <>
        <Button label='primary' variant='outlined' />
        <Button label='subtle' variant='outlined' color='subtle' />
        <Button label='disabled' variant='outlined' disabled />
        <br />
        <Button label='start with icon' variant='outlined' startWithIcon={<AddCircle />} />
        <Button label='end with icon' variant='outlined' endWithIcon={<AddCircle />} />
    </>
);
Outlined.decorators = [Story => <Box sx={{ '& button': { mr: 3, mb: 3 } }}>{Story()}</Box>];

export const InForms = () => (
    <>
        <Button label='save' variant='filled' color='primary' type='submit' />
        <Button label='cancel' color='subtle' type='reset' />
        <Button label='delete' color='error' />
    </>
);
InForms.decorators = [Story => <Box sx={{ '& button': { mr: 3 } }}>{Story()}</Box>];

export const UseAsLink = () => (
    <>
        <Button
            label='internal link'
            href='#'
        />
        <Button
            label='external link'
            color='secondary'
            href='#'
            target
            ariaLabel='Please use meaningful string if link opens in new window.'
        />
    </>
);
UseAsLink.decorators = [Story => <Box sx={{ '& a': { mr: 3 } }}>{Story()}</Box>];

export const Fullwidth = () => (
    <Button label='full width button with custom style' variant='fullwidth' startWithIcon={<AddCircle />} />
);
