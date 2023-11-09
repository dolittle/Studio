// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Backdrop, CircularProgress, CircularProgressProps } from '@mui/material';

/**
 * The props for a {@link LoadingSpinner} component.
 */
export type LoadingSpinnerProps = CircularProgressProps & {
    /**
     * If true, the spinner will cover the navigation bar.
     */
    fullPage?: boolean;
};

/**
 * The {@link LoadingSpinner} component is used to display a loading spinner.
 * @param {LoadingSpinnerProps} props - The {@link LoadingSpinnerProps}.
 * @returns A {@link LoadingSpinner} component.
 */
export const LoadingSpinner = (props: LoadingSpinnerProps) =>
    <Backdrop open={true} sx={{ zIndex: props.fullPage ? theme => theme.zIndex.drawer + 1 : 'auto' }}>
        <CircularProgress {...props} />
    </Backdrop>;
