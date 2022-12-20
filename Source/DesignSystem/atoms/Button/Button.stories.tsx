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
            component: 'A button triggers an event or action. Its label should let the user know what will happen next.',
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
