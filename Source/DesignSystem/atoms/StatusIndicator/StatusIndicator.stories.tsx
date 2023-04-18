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

metadata.argTypes = {
    status: {
        control: {
            type: 'select',
            options: ['connected', 'waiting', 'pending', 'failing', 'string'],
        },
    },
    sx: { control: false },
};

metadata.args = {
    status: 'connected',
    variantFilled: false,
};

export default metadata;

export const Default = createStory();

export const DefaultVariants = createStory();
DefaultVariants.decorators = [
    () => (
        <Grid container gap={3}>
            <StatusIndicator status='connected' />
            <StatusIndicator status='waiting' />
            <StatusIndicator status='pending' />
            <StatusIndicator status='failing' />
            <StatusIndicator status='unknown' />
        </Grid>
    )
];

export const FilledVariants = createStory();
FilledVariants.decorators = [
    () => (
        <Grid container gap={3}>
            <StatusIndicator status='connected' variantFilled />
            <StatusIndicator status='waiting' variantFilled />
            <StatusIndicator status='pending' variantFilled />
            <StatusIndicator status='failing' variantFilled />
            <StatusIndicator status='unknown' variantFilled />
        </Grid>
    )
];

export const WithCustomLabel = createStory({
    label: 'Add your label here',
});
