// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Fragment, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Divider, List, ListItem } from '@mui/material';

import { Button, ConfirmDialog } from '@dolittle/design-system';

import { confirmDialogDescription, listArray } from './helper';

export default {
    title: 'Confirm Dialog',
    component: ConfirmDialog,
    parameters: {
        docs: {
            description: { component: confirmDialogDescription },
        },
    },
    args: {
        id: 'confirm',
        title: 'Confirm Dialog',
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
} as ComponentMeta<typeof ConfirmDialog>;

const Template: ComponentStory<typeof ConfirmDialog> = args => {
    const [isOpen, setIsOpen] = useState(args.isOpen || false);

    return (
        <>
            <Button label='Open dialog' onClick={() => setIsOpen(true)} />
            <ConfirmDialog {...args} isOpen={isOpen} onCancel={() => setIsOpen(false)} onConfirm={() => setIsOpen(false)} />
        </>
    );
};

export const Default = Template.bind({});

export const WithChildrenContent = Template.bind({});
WithChildrenContent.args = {
    children: (
        <List>
            {listArray.map((item, index) =>
                <Fragment key={index}>
                    <ListItem>{item}</ListItem>
                    {listArray.length - 1 !== index && <Divider />}
                </Fragment>
            )}
        </List>
    ),
};
