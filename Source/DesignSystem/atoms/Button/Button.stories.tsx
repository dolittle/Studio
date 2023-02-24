// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link, BrowserRouter } from 'react-router-dom';

import { ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { Button, ButtonProps } from '@dolittle/design-system';

import { availableIcons, iconMapping } from '../IconButton/Icons';

import { buttonDescription, spacing } from './helpers';

export default {
    title: 'Button',
    component: Button,
    parameters: {
        docs: {
            description: { component: buttonDescription },
        },
    },
    argTypes: {
        variant: {
            control: {
                type: 'radio',
                options: ['text', 'filled', 'outlined', 'fullwidth'],
            },
        },
        color: {
            control: {
                type: 'radio',
                options: ['primary', 'subtle', 'secondary', 'error', 'info', 'success', 'warning'],
            },
        },
        startWithIcon: {
            options: availableIcons,
            mapping: iconMapping,
            table: {
                type: { summary: 'ReactElement<SvgIconProps>' },
            },
        },
        endWithIcon: {
            options: availableIcons,
            mapping: iconMapping,
            table: {
                type: { summary: 'ReactElement<SvgIconProps>' },
            },
        },
        onClick: { control: false },
        sx: { control: false },
        overrides: { control: false },
    },
    args: {
        label: 'Default button',
        variant: 'text',
        color: 'primary',
        startWithIcon: undefined,
        endWithIcon: undefined,
        isFullWidth: false,
        disabled: false,
        href: undefined,
        target: false,
        ariaLabel: undefined,
        type: 'button',
        component: 'button',
        role: 'button',
    },
} as ComponentMeta<typeof Button>;

export const Default = (args: ButtonProps) => <Button {...args} />;

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
Text.decorators = [Story => <Box sx={spacing}>{Story()}</Box>];

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
Filled.decorators = [Story => <Box sx={spacing}>{Story()}</Box>];

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
Outlined.decorators = [Story => <Box sx={spacing}>{Story()}</Box>];

export const Fullwidth = () =>
    <Button label='full width button with custom style' variant='fullwidth' startWithIcon={<AddCircle />} />;

export const UseInForms = () => (
    <>
        <Button label='save' variant='filled' type='submit' onClick={action('submited')} />
        <Button label='cancel' color='subtle' type='reset' onClick={action('canceled')} />
        <Button label='delete' color='error' onClick={action('deleted')} />
    </>
);
UseInForms.decorators = [Story => <Box sx={spacing}>{Story()}</Box>];

export const UseAsLink = () => (
    <>
        <Button
            label='internal link'
            color='subtle'
            href='#'
        />

        <Button
            label='external link'
            href='#'
            target
            ariaLabel='Please use meaningful ariaLabel if link opens in new window.'
        />

        <Button
            label='with react-router-dom'
            color='secondary'
            overrides={{ component: Link, to: '' }}
        />
    </>
);
UseAsLink.decorators = [Story =>
    <BrowserRouter>
        <Box sx={{ '& a': { mr: 3, mb: 3 } }}>{Story()}</Box>
    </BrowserRouter>
];
