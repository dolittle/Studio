// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, CircularProgress } from '@mui/material';

export const LoadingSpinner = () =>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 1, p: 2 }}>
        <CircularProgress />
    </Box>;
