// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { AlertBox } from './AlertBox';

const { metadata, createStory } = componentStories(AlertBox);

metadata.parameters = {
    docs: {
        description: {
            component: `An alert displays a short, important message in a way that attracts the user’s attention without interrupting the user’s tasks. These should not be confused with snackbars, which are used to signal feedback around specific system tasks that a user has just completed or attempted to complete. Alerts are used to indicate system status and feedback as a whole.
            
**Styling:** The default style for alerts is outlined with an icon to indicate what severity level the alert is. Alerts can contain a title that provides additional information about the severity level. An alert can have an action such as a close button.

**Severity levels:** We have four severity levels: error alerts, warning alerts, info alerts, and success alerts. 
- *Error alerts* let the user know something is wrong. Explain the problem and provide the user with a next step, an alternative solution or contact information to our help services. Keep the message simple and direct. Don’t use technical details or blame the user. 
- *Warning alerts* anticipate a change that will impact the system and therefore user’s experience. Inform but don’t alarm. If an action is required from the user, clearly state what is needed and tell them what to expect after. Provide a cancel option if possible. 
- *Success alerts* indicate the system is functioning as it should.  
- *Info alerts* provide the user with additional helpful information that doesn't require action.
`,
        }
    }
};


export default metadata;

export const Error = createStory({
    severity: 'error',
    title: 'Something went wrong',
    message: 'Please try again later. If problem persists, please',
    endWithLink: {
        linkHref: 'mailto: support@dolittle.com',
        linkText: 'contact support'
    }
});

export const Warning = createStory({
    severity: 'warning',
    title: 'This is a warning.',
    message: 'Please try again later. If problem persists, please',
    endWithLink: {
        linkHref: 'mailto: support@dolittle.com',
        linkText: 'contact support'
    }
});

export const Info = createStory({
    severity: 'info',
    title: 'This is an info message.',
    message: 'For more information, please',
    endWithLink: {
        linkHref: 'https://www.dolittle.com/',
        linkText: 'look our website'
    }
});

export const Success = createStory({
    severity: 'success',
    title: 'All good!',
    message: 'You are all set up and ready to go!',
});

export const WithAction = createStory({
    severity: 'info',
    title: 'This is an info message.',
    message: 'For more information, please',
    endWithLink: {
        linkHref: 'https://www.dolittle.com/',
        linkText: 'look our website'
    },
    isDismissable: true,
    onDismiss: () => alert('Close action was clicked.')
});
