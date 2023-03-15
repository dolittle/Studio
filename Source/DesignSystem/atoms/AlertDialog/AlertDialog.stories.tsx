// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Fragment, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Divider, List, ListItem } from '@mui/material';

import { Button, AlertDialog } from '@dolittle/design-system';

import { dialogDescription, listArray } from './helpers';

export default {
    title: 'Alert Dialog',
    component: AlertDialog,
    parameters: {
        docs: {
            description: { component: `
Dialogs are windows that appear in front of all content to provide immediate and critical information or 
to ask the user for a decision. Dialogs disable all other functionality until a user engages with it by either confirming,
dismissing, or taking the required action. Dialogs are purposefully interruptive so they should be used sparingly. 

**Styling:** In some cases the description may be enough information for the user to make a decision and a title is not needed.
If a title is required use a clear question or statement with an explanation in the content area. Avoid apologies, 
ambiguity or questions such as "warning!" or "are you sure?". 

**Types of Dialogs:**
- ***Alert dialogs*** are urgent interruptions, requiring acknowledgement or action, that inform the user about a situation. 
Most alerts do not need titles. They summarize a decision in a sentence or two by either asking a question or making a 
statement related to the action buttons.
Alert dialogs must always contain an action item such as "agree", "accept", or "continue" and a dismissive action such as "cancel", 
"disagree" or "deny".` },
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
            {listArray.map((item, index) =>
                <Fragment key={index}>
                    <ListItem>{item}</ListItem>
                    {listArray.length - 1 !== index && <Divider />}
                </Fragment>
            )}
        </List>
    ),
};
