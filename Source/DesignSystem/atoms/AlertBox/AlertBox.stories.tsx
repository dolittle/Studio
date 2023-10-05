// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, AlertBox } from '@dolittle/design-system';

import { AlertBoxErrorTitle, AlertBoxErrorMessage, AlertBoxInfoMessage } from './helpers';

const { metadata, createStory } = componentStories(AlertBox);

metadata.title = 'Alert Box';

metadata.parameters = {
    docs: {
        description: {
            component: `
An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's tasks.
These should not be confused with snackbars, which are used to signal feedback around specific system tasks that a user has just 
completed or attempted to complete. Alerts are used to indicate system status and feedback as a whole.

**Styling:** The default style for alerts is outlined with an icon to indicate what severity level the alert is.
Alerts can contain a title that provides additional information about the severity level. An alert can have an action such as a close button.

**Severity levels:** We have four severity levels: error, warning, info, and success.
- ***Error alerts*** let the user know something is wrong. Explain the problem and provide the user with a next step, 
an alternative solution or contact information to our help services. Keep the message simple and direct. 
Don't use technical details or blame the user.
- ***Warning alerts*** anticipate a change that will impact the system and therefore user's experience. Inform but don't alarm.
If an action is required from the user, clearly state what is needed and tell them what to expect after. Provide a cancel option if possible.
- ***Success alerts*** indicate the system is functioning as it should.
- ***Info alerts*** provide the user with additional helpful information that doesn't require action.` },
    },
};

metadata.argTypes = {
    message: {
        options: ['string', 'AlertBoxErrorMessage', 'AlertBoxInfoMessage'],
        mapping: {
            string: 'This can be your custom alert message.',
            AlertBoxErrorMessage: <AlertBoxErrorMessage />,
            AlertBoxInfoMessage: <AlertBoxInfoMessage />,
        },
    },
    sx: { control: false },
};

metadata.args = {
    severity: 'error',
    title: AlertBoxErrorTitle,
    message: 'AlertBoxErrorMessage',
    isDismissible: false,
    isOpen: true,
};

export default metadata;

export const Default = createStory();

export const DismissableAlert = createStory({
    severity: 'info',
    title: 'This is an alert box that can be dismissed',
    message: 'Click the `X` icon to dismiss the alert.',
    isDismissible: true,
});
