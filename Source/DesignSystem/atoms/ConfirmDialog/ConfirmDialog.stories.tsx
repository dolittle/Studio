// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { ConfirmDialog } from './ConfirmDialog';

const { metadata, createStory } = componentStories(ConfirmDialog, {});

metadata.parameters = {
    docs: {
        description: {
            component: `Dialogs are windows that appear in front of all content to provide immediate and critical information or to ask the user for a decision. Dialogs disable all other functionality until a user engages with it by either confirming, dismissing, or taking the required action. Dialogs are purposefully interruptive so they should be used sparingly. 
            
            **Styling**
            - When using a dialog always use a skrim behind to help draw focus to the dialog. 
            - Use direct and concise communication. The title should capture the essence of the message. In some cases the body text may be enough information for the user to make a decision and a title is not needed. Do not repeat the body information in the title of the dialog. 
            - Always provide a cancel or exit option if a change will be caused by the user interacting with the dialog. 
            - Use secondary button styling for both actions and use color to call attention to the required or suggested action if necessary. 
            - Dialogs use the highest elevation, 24dp. 
            - If the action or output is irreversible or will cause significant changes, consider using a Danger Button or another method for alerting the user of the impact. 
            
            **Transitions**
            - Dialogs should use a fade transition when appearing and disappearing. 
            
            **Draggable & Scrollable**
            - Dialogs should be draggable to allow the user to see what's behind it. However, if there is critical information on the screen that the user needs access to in order to make a decision on the dialog then that information should be included in the dialog. 
            - While it's best to avoid scrolling dialogs, this option should be used to avoid the dialog extending beyond the viewport. 
            
            **Types of Dialogs**
            - *Alert dialogs* are urgent interruptions, requiring acknowledgement or action, that inform the user about a situation. Most alerts do not need titles. They summarize a decision in a sentence or two by either asking a question or making a statement related to the action buttons. If a title is required use a clear question or statement with an explanation in the content area. Avoid apologies, ambiguity or questions such as "warning!" or "are you sure?" Alert dialogs must always contain an action item such as "agree", "accept", or "continue" and a dismissive action such as "cancel", "disagree" or "deny". Never provide a third action that leads the user away, leaving the task unfinished. 
            - *Form dialogs* allow users to fill out form fields within a dialog. This might include a textfield input, a checkbox, a radio selection, or a selection from a dropdown menu. Allowing tabbing so the user can jump from one input to the next.
`,
        },
    },
};

export default metadata;

export const DialogBox = createStory({
    id: 'alert-dialog-title',
    isOpen: true,
    title: 'This is a dialog box.',
    description: 'This is a description of the dialog box.',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
});
