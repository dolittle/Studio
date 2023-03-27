// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid } from '@mui/material';

import { componentStories, StatusIndicator } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(StatusIndicator);

metadata.title = 'Status Indicator';

metadata.parameters = {
    docs: {
        description: {
            component: ``,
        },
    },
};

metadata.args = {
    status: 'running',
    filledVariant: false,
};

export default metadata;

export const Default = createStory();

export const TextVariants = createStory();
TextVariants.decorators = [
    () => (
        <Grid container gap={3}>
            <StatusIndicator status='running' />
            <StatusIndicator status='waiting' />
            <StatusIndicator status='connected' />
            <StatusIndicator status='pending' />
            <StatusIndicator status='failed' />
            <StatusIndicator status='unknown' label='Unknown status value' />
        </Grid>
    )
];

export const FilledVariants = createStory();
FilledVariants.decorators = [
    () => (
        <Grid container gap={3}>
            <StatusIndicator status='running' filledVariant />
            <StatusIndicator status='waiting' filledVariant />
            <StatusIndicator status='connected' filledVariant />
            <StatusIndicator status='pending' filledVariant />
            <StatusIndicator status='failed' filledVariant />
            <StatusIndicator status='unknown' label='Unknown status value' filledVariant />
        </Grid>
    )
];
