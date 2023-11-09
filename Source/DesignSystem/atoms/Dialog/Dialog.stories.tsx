// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Fragment, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Divider, List, ListItem } from '@mui/material';

import { Dialog, Button } from '../../index';

import { dialogDescription, dummyArray } from './helpers';

export default {
    component: Dialog,
    parameters: {
        docs: {
            description: { component: dialogDescription },
        },
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
    args: {
        id: 'dialog',
        isOpen: false,
        title: 'This is a title',
        description: 'This is a description of the dialog. It can be used to provide more information about the dialog and what it does.',
        isLoading: false,
        cancelBtnLabel: 'Cancel',
        hideCancelButton: false,
        onCancel: action('Canceled!'),
        confirmBtnLabel: 'Confirm',
        confirmBtnColor: 'primary',
        onConfirm: action('Confirmed!'),
        onClose: action('Closed!'),
    },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = args => {
    const [isDialogOpen, setIsDialogOpen] = useState(args.isOpen || false);

    const handleDialogClose = () => setIsDialogOpen(false);

    return (
        <>
            <Button label='Open dialog' onClick={() => setIsDialogOpen(true)} />

            <Dialog
                {...args}
                isOpen={isDialogOpen}
                onCancel={() => {
                    handleDialogClose();
                    args.onCancel();
                }}
                onConfirm={() => {
                    handleDialogClose();
                    args.onConfirm();
                }}
                onClose={() => {
                    handleDialogClose();
                    if (args.onClose) args.onClose();
                }}
            />
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

export const WithoutCancelButton = Template.bind({});
WithoutCancelButton.args = {
    hideCancelButton: true,
};

export const WithLoading = Template.bind({});
WithLoading.args = {
    isLoading: true,
};
