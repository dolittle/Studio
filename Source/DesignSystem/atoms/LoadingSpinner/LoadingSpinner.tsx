// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

/**
 * The {@link LoadingSpinner} component is used to display a loading spinner.
 * @param {CircularProgress} props - The {@link CircularProgressProps}.
 * @returns A {@link LoadingSpinner} component.
 */
export const LoadingSpinner = (props: CircularProgressProps) =>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2 }}>
        <CircularProgress {...props} />
    </Box>;
