// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { componentStories, IconButton, availableIcons, SvgIconsDefinition } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(IconButton);

metadata.title = 'Icon Button';

metadata.argTypes = {
    download: { control: false },
    href: { control: false },
    onClick: { control: false },
};

metadata.args = {
    tooltipText: 'Add icon purpose here',
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
        {availableIcons.map(key => (
            <IconButton key={key} tooltipText={key} icon={key as SvgIconsDefinition['icon']} />
        ))}
    </Box>;
