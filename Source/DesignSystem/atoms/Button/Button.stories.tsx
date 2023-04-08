// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link, BrowserRouter } from 'react-router-dom';

import { ComponentMeta, DecoratorFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Box } from '@mui/material';

import { Button, ButtonProps, availableIcons, SvgIcons } from '@dolittle/design-system';

const buttonWrapper = [Story => <Box sx={{ '& button': { mr: 3, mb: 3 } }} >{Story()}</Box>] as DecoratorFn[];

export default {
    title: 'Button',
    component: Button,
    parameters: {
        docs: {
            description: {
                component: `A button triggers an event or action. Its label should let the user know what will happen next. Buttons come in three style variations. 
            All variations can be used with or without icons to help lift the UI and quickly visually communicate to the user what the button will do.` },
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
            mapping: SvgIcons[availableIcons[0]],
        },
        endWithIcon: {
            options: availableIcons,
            mapping: SvgIcons[availableIcons[0]],
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
        <Button label='start with icon' startWithIcon='AddCircle' />
        <Button label='end with icon' endWithIcon='AddCircle' />
    </>
);
Text.decorators = buttonWrapper;
Text.parameters = {
    docs: {
        description: {
            story: `Text buttons are used for secondary actions, such as 'cancel' or to carry out an optional action within the page.
            They are commonly found in dialogs, cards or toolbars. Text buttons may use our primary main color or the inherit color
            of the page depending on whether or not the user's attention should be drawn to the button or if the button needs to be distinguished
            from other content on the page. When there are several actions the user can take on a single page it's best to use text buttons to save space
            and to inadvertently prevent creating a call to action that should not exist.`
        },
    },
};

export const Filled = () => (
    <>
        <Button label='primary' variant='filled' />
        <Button label='subtle' variant='filled' color='subtle' />
        <Button label='disabled' variant='filled' disabled />
        <br />
        <Button label='start with icon' variant='filled' startWithIcon='AddCircle' />
        <Button label='end with icon' variant='filled' endWithIcon='AddCircle' />
    </>
);
Filled.decorators = buttonWrapper;
Filled.parameters = {
    docs: {
        description: {
            story: `Filled buttons are reserved for primary actions. They should be used to call attention to an action on a form or to
            highlight the strongest call to action on the page. Filled buttons should appear only once per container (not including the
            application header or in a modal dialog). Not every screen requires a primary action, or filled button. Filled buttons use our primary main color.`
        },
    },
};

export const Outlined = () => (
    <>
        <Button label='primary' variant='outlined' />
        <Button label='subtle' variant='outlined' color='subtle' />
        <Button label='disabled' variant='outlined' disabled />
        <br />
        <Button label='start with icon' variant='outlined' startWithIcon='AddCircle' />
        <Button label='end with icon' variant='outlined' endWithIcon='AddCircle' />
    </>
);
Outlined.decorators = buttonWrapper;
Outlined.parameters = {
    docs: {
        description: {
            story: `Outlined buttons can be used in login screens or as a secondary call to action on a page where there are already text buttons and primary buttons.
            The empty fill allows third-party icons to be used in their original styling.`
        },
    },
};

export const Fullwidth = () => (
    <Button
        label='full width button with custom style'
        variant='fullwidth'
        startWithIcon='AddCircle'
    />
);
Fullwidth.parameters = {
    docs: {
        description: {
            story: `Full width button are typically used for primary actions. They are used when inside a parent container or beneath a container whose width expands.
               The full width button can signal the action applies to all content above, in its surrounding container or to visually balance the empty space.`
        },
    },
};

export const UseInForms = () => (
    <>
        <Button label='save' variant='filled' type='submit' onClick={action('submited')} />
        <Button label='cancel' color='subtle' type='reset' onClick={action('canceled')} />
        <Button label='delete' color='error' onClick={action('deleted')} />
    </>
);
UseInForms.decorators = buttonWrapper;
UseInForms.parameters = {
    docs: {
        description: {
            story: `Form buttons are used in dialogs or forms. If there is more than one button option it is important to distinguish between the choices
            by using different styling and careful wording.`
        },
    },
};

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
UseAsLink.parameters = {
    docs: {
        description: {
            story: `Link buttons are used to link to external documentation, emails or
            provide internal linking. Internal links should use the inherit color of their parent
            container. External links should use the secondary color.`
        },
    },
};
