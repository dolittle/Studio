// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories } from '@dolittle/design-system';

import { Button } from './Button';

// Would like to get all of them into one Story.
import { AddCircle, DeleteRounded, DownloadRounded, EditRounded, SaveRounded, RestartAltRounded } from '@mui/icons-material';

const { metadata, createStory } = componentStories(Button, {
    actions: {
        onClick: 'clicked',
    },
});

metadata.parameters = {
    docs: {
        description: {
            component: `A button triggers an event or action. Its label should let the user know what will happen next.

**Styling:** Buttons come in three style variations. All variations can be used with or without icons to help lift the UI and quickly visually communicate to the user what the button will do.
- *Filled buttons* are reserved for primary actions. They should be used to call attention to an action on a form or to highlight the strongest call to action on the page. Filled buttons should appear only once per container (not including the application header or in a modal dialog). Not every screen requires a primary action, or filled button. Filled buttons use our primary main color. 
- *Outlined buttons* are reserved for login screens. The empty fill allows third-party icons to be used in their original styling. 
- *Text buttons* are used for secondary actions, such as 'cancel' or to carry out an optional action within the page. They are commonly found in dialogs, cards or sometimes toolbars. Text buttons may use our primary main color or the inherit color of the page depending on whether or not the user’s attention should be drawn to the button or if the button needs to be distinguished from other content on the page. 
`,
        },
    },
};

metadata.argTypes = {
    startWithIcon: {
        description: 'The icon to show before the label.',
        control: false
    },
    endWithIcon: {
        description: 'The icon to show after the label.',
        control: false
    },
    isFullWidth: {
        control: {
            type: 'boolean',
            default: false
        }
    },
    onClick: {
        description: 'The event handler for when the button is clicked.',
        control: false
    },
    href: {
        control: false
    },
    sx: {
        control: false
    },
    children: {
        control: false
    }
};

export default metadata;

export const Filled = createStory({
    variant: 'filled',
    label: 'Filled Button',
});

export const Text = createStory({
    label: 'Text Button',
});

export const Outlined = createStory({
    variant: 'outlined',
    label: 'Outlined Button',
});

export const Secondary = createStory({
    label: 'Secondary Button',
    color: 'secondary',
    startWithIcon: <AddCircle />,
});

export const StartIcon = createStory({
    label: 'With Start Icon',
    startWithIcon: <EditRounded />,
});

export const EndIcon = createStory({
    label: 'With End Icon',
    endWithIcon: <EditRounded />,
});

export const fullwidth = createStory({
    variant: 'fullwidth',
    label: 'Full Width Button',
    startWithIcon: <AddCircle />,
});

// export const DisabledWithIcon = createStory({
//     label: 'Disabled Button with icon',
//     disabled: true,
//     startWithIcon: <EditRounded />,
// });

export const WithLink = createStory({
    label: 'With Link',
    href: 'https://dolittle.io',
    target: true,
});

export const Danger = createStory({
    label: 'Danger Button',
    variant: 'danger',
});
