// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { componentStories, IconButton, availableIcons, SvgIconsDefinition } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(IconButton);

metadata.title = 'Icon Button';
metadata.parameters = {
    docs: {
        description: {
            component: `Icon buttons are commonly used in toolbars or when trying to save space in components such as data grids or cards. 
        Icon only buttons should only be used when the icon is strongly associated with the action such as a trash icon for the 'delete' action 
        or the floppy disk for the 'save' action. If the user has to guess what the icon button does, use a text button instead. 
        If an icon button is the only feasible choice due to space or consistency in the UI then include a hover tooltip that indicates the function of the button. 
        By default, use the inherit color.`
        },
    },
};

metadata.argTypes = {
    download: { control: false },
    href: { control: false },
    onClick: { control: false },
    sx: { control: false },
};

metadata.args = {
    tooltipText: 'Add the purpose of the icon here',
    icon: 'CloseRounded',
    color: 'inherit',
    size: 'small',
    edge: false,
    disabled: false,
};

export default metadata;

export const Default = createStory();

export const IconsWeUse = () =>
    <Box sx={{ '& button': { m: 1 } }}>
        {availableIcons.map(key => <IconButton key={key} tooltipText={key} icon={key as SvgIconsDefinition} />)}
    </Box>;
