// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

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
            options: ['success', 'table-success', 'waiting', 'warning', 'error', 'unknown'],
        },
    },
    sx: { control: false },
};

metadata.args = {
    status: 'success',
    variantFilled: false,
};

export default metadata;

export const Default = createStory();

export const DefaultVariants = createStory();
DefaultVariants.decorators = [
    () => (
        <Stack direction='row' gap={3}>
            <StatusIndicator status='success' />
            <StatusIndicator status='table-success' />
            <StatusIndicator status='waiting' />
            <StatusIndicator status='warning' />
            <StatusIndicator status='error' />
            <StatusIndicator status='unknown' />
        </Stack>
    )
];

export const FilledVariants = createStory();
FilledVariants.decorators = [
    () => (
        <Stack direction='row' gap={3}>
            <StatusIndicator status='success' variantFilled />
            <StatusIndicator status='table-success' variantFilled />
            <StatusIndicator status='waiting' variantFilled />
            <StatusIndicator status='warning' variantFilled />
            <StatusIndicator status='error' variantFilled />
            <StatusIndicator status='unknown' variantFilled />
        </Stack>
    )
];

export const WithCustomLabel = createStory({
    label: 'Add your label here',
});
