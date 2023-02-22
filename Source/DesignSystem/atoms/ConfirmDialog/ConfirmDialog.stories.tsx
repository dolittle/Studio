// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Fragment, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { List, ListItem, Divider } from '@mui/material';

import { Button, ConfirmDialog } from '@dolittle/design-system';

export default {
    title: 'Confirm Dialog',
    component: ConfirmDialog,
    parameters: {
        docs: {
            description: {
                component: `Dialogs are windows that appear in front of all content to provide immediate and critical information or 
                to ask the user for a decision. Dialogs disable all other functionality until a user engages with it by either confirming,
                dismissing, or taking the required action. Dialogs are purposefully interruptive so they should be used sparingly.

**Title**
- Use direct and concise communication.
- If a title is required use a clear question or statement with an explanation in the content area. Avoid apologies, 
ambiguity or questions such as "warning!" or "are you sure?"
- In some cases the body text may be enough information for the user to make a decision and a title is not needed.

**Action Buttons**
- The confirm button should be the primary action in the dialog. It should be the action that the user is most likely to take.

**Types of Dialogs**
- *Alert dialogs* are urgent interruptions, requiring acknowledgement or action, that inform the user about a situation. 
    Most alerts do not need titles. They summarize a decision in a sentence or two by either asking a question or making a 
    statement related to the action buttons.
    Alert dialogs must always contain an action item such as "agree", "accept", or "continue" and a dismissive action such as "cancel", 
    "disagree" or "deny".
`,
            },
        },
    },
    args: {
        id: 'confirm',
        title: 'Confirm dialog',
        description: 'This is a description of the dialog. It can be used to provide more information about the dialog and what it does.',
        confirmTextColor: 'primary',
        cancelText: 'Cancel',
        confirmText: 'Confirm',
    },
    argTypes: {
        children: { control: false },
        confirmTextColor: {
            control: {
                type: 'radio',
                options: ['primary', 'subtle', 'error', 'success', 'warning'],
            },
        },
        isOpen: { control: false },
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

const listArray = [
    'List item 1', 'List item 2', 'List item 3', 'List item 4', 'List item 5', 'List item 6', 'List item 7',
    'List item 8', 'List item 9', 'List item 10', 'List item 11', 'List item 12', 'List item 13', 'List item 14',
    'List item 15', 'List item 16', 'List item 17', 'List item 18', 'List item 19', 'List item 20', 'List item 21',
    'List item 22', 'List item 23', 'List item 24', 'List item 25', 'List item 26', 'List item 27', 'List item 28',
];
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

export const DeleteDialog = Template.bind({});
DeleteDialog.args = {
    title: 'Delete this item?',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmTextColor: 'error',
    confirmText: 'Delete',
};
