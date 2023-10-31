// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

import { componentStories, StatusIndicator, StatusIndicatorProps } from '../../index';

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
            <StatusIndicator status='information' />
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
            <StatusIndicator status='information' variantFilled />
            <StatusIndicator status='warning' variantFilled />
            <StatusIndicator status='error' variantFilled />
            <StatusIndicator status='unknown' variantFilled />
        </Stack>
    )
];

export const WithCustomLabel = createStory({
    label: 'Add your label here',
});
export const WithCustomMessage = () => {
    const props: StatusIndicatorProps = {
        status: 'warning',
        label: 'Hover on me for a tooltip',
        message: 'A long descriptive message that describes the current status',
    };

    return (
        <Stack direction='row' gap={3}>
            <StatusIndicator variantFilled {...props} />
            <StatusIndicator {...props} />
        </Stack>
    );
};
