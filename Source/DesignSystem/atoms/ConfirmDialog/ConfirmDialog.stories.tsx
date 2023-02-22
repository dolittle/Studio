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

**Styling**
    - When using a dialog always use a skrim behind to help draw focus to the dialog.
    - Use direct and concise communication. The title should capture the essence of the message. 
      In some cases the body text may be enough information for the user to make a decision and a title is not needed. 
      Do not repeat the body information in the title of the dialog.
    - Always provide a cancel or exit option if a change will be caused by the user interacting with the dialog.
    - Use secondary button styling for both actions and use color to call attention to the required or suggested action if necessary.
    - Dialogs use the highest elevation, 24dp.
    - If the action or output is irreversible or will cause significant changes, consider using a Danger Button or another method 
      for alerting the user of the impact
**Transitions**
    - Dialogs should use a fade transition when appearing and disappearing
**Draggable & Scrollable**
    - Dialogs should be draggable to allow the user to see what's behind it. However, if there is critical information on the 
      screen that the user needs access to in order to make a decision on the dialog then that information should be 
      included in the dialog.
    - While it's best to avoid scrolling dialogs, this option should be used to avoid the dialog extending beyond the viewport
**Types of Dialogs**
    - *Alert dialogs* are urgent interruptions, requiring acknowledgement or action, that inform the user about a situation. 
      Most alerts do not need titles. They summarize a decision in a sentence or two by either asking a question or making a 
      statement related to the action buttons. If a title is required use a clear question or statement with an explanation 
      in the content area. Avoid apologies, ambiguity or questions such as "warning!" or "are you sure?" Alert dialogs must 
      always contain an action item such as "agree", "accept", or "continue" and a dismissive action such as "cancel", "disagree" or "deny". 
      Never provide a third action that leads the user away, leaving the task unfinished.
    - *Form dialogs* allow users to fill out form fields within a dialog. This might include a textfield input, a checkbox, a radio selection, 
      or a selection from a dropdown menu. Allowing tabbing so the user can jump from one input to the next.
`,
            },
        },
    },
    args: {
        id: 'confirm',
        title: 'Confirm dialog',
        description: `This is a description of the dialog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        cancelText: 'Cancel',
        confirmText: 'Confirm',
    },
    argTypes: {
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
