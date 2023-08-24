// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

export const LoadingSpinner = (props: CircularProgressProps) =>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 1, p: 2 }}>
        <CircularProgress {...props} />
    </Box>;

// TODO: Move this to a separate component.
export const FullPageLoadingSpinner = (props: CircularProgressProps) =>
    <Box sx={{ width: 1, height: 1, position: 'absolute', top: 0, left: 0, zIndex: '9999', backgroundColor: '#191A2150' }}>
        <LoadingSpinner {...props} />
    </Box>;
