// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DownloadRounded } from '@mui/icons-material';

import { componentStories } from '@dolittle/design-system';

import { IconButton } from './IconButton';

const { metadata, createStory } = componentStories(IconButton);

export default metadata;

export const Inherit = createStory({
    label: 'Download',
    icon: <DownloadRounded />
});

export const Secondary = createStory({
    color: 'primary'
});

export const Disabled = createStory({
    disabled: true
});
