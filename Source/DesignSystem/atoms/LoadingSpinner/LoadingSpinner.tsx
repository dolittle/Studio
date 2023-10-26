// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

/**
 * The props for a {@link LoadingSpinner} component.
 */
export type LoadingSpinnerProps = CircularProgressProps & {
    /**
     * Whether or not the loading spinner should take up the full height of the screen.
     */
    fullHeight?: boolean;
};

/**
 * The {@link LoadingSpinner} component is used to display a loading spinner.
 * @param {LoadingSpinnerProps} props - The {@link LoadingSpinnerProps}.
 * @returns A {@link LoadingSpinner} component.
 */
export const LoadingSpinner = (props: LoadingSpinnerProps) =>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: props.fullHeight ? '100vh' : 'auto', p: 2 }}>
        <CircularProgress {...props} />
    </Box>;
