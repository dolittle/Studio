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
            component: 'A button triggers an event or action. Its label should let the user know what will happen next.

**Styling:** Buttons come in three style variations. All variations can be used with or without icons to help lift the UI and quickly visually communicate to the user what the button will do.
- *Filled buttons* are reserved for primary actions. They should be used to call attention to an action on a form or to highlight the strongest call to action on the page. Filled buttons should appear only once per container (not including the application header or in a modal dialog). Not every screen requires a primary action, or filled button. Filled buttons use our primary main color. 
- *Outlined buttons* are reserved for login screens. The empty fill allows third-party icons to be used in their original styling. 
- *Text buttons* are used for secondary actions, such as ‘cancel’ or to carry out an optional action within the page. They are commonly found in dialogs, cards or sometimes toolbars. Text buttons may use our primary main color or the inherit color of the page depending on whether or not the user’s attention should be drawn to the button or if the button needs to be distinguished from other content on the page. 
',
        }
    }
};

export default metadata;

export const Filled = createStory({
    variant: 'filled',
    label: 'Filled Button',
});

export const Text = createStory({
    variant: 'text',
    label: 'Text Button',
});

export const Outlined = createStory({
    variant: 'outlined',
    label: 'Outlined Button',
});

export const WithIcon = createStory({
    variant: 'text',
    label: 'With Icon',
    startWithIcon: <EditRounded />,
});

export const DisabledWithIcon = createStory({
    variant: 'text',
    label: 'Disabled Button with icon',
    disabled: true,
    startWithIcon: <EditRounded />,
});
