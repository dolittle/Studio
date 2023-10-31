// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Fragment, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Divider, List, ListItem } from '@mui/material';

import { AlertDialog, Button } from '../../index';

import { alertDialogDescription, dummyArray } from './helpers';

export default {
    title: 'Alert Dialog',
    component: AlertDialog,
    parameters: {
        docs: {
            description: { component: alertDialogDescription },
        },
    },
    args: {
        id: 'alert',
        title: 'Alert Dialog',
        description: 'This is a description of the dialog. It can be used to provide more information about the dialog and what it does.',
        confirmBtnColor: 'primary',
        cancelBtnText: 'Cancel',
        confirmBtnText: 'Confirm',
    },
    argTypes: {
        children: { control: false },
        isOpen: { control: false },
        confirmBtnColor: {
            control: {
                type: 'radio',
                options: ['primary', 'subtle', 'secondary', 'error', 'warning'],
            },
        },
    },
} as ComponentMeta<typeof AlertDialog>;

const Template: ComponentStory<typeof AlertDialog> = args => {
    const [isOpen, setIsOpen] = useState(args.isOpen || false);

    return (
        <>
            <Button label='Open dialog' onClick={() => setIsOpen(true)} />
            <AlertDialog {...args} isOpen={isOpen} onCancel={() => setIsOpen(false)} onConfirm={() => setIsOpen(false)} />
        </>
    );
};

export const Default = Template.bind({});

export const WithChildrenContent = Template.bind({});
WithChildrenContent.args = {
    title: 'Alert Dialog with children',
    description: 'This dialog displays list items as children. It can be used to display a list of items that the user can cancel or confirm.',
    children: (
        <List>
            {dummyArray.map((item, index) =>
                <Fragment key={index}>
                    <ListItem>{item}</ListItem>
                    {dummyArray.length - 1 !== index && <Divider />}
                </Fragment>
            )}
        </List>
    ),
};
