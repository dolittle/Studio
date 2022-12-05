// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';
import { DownloadRounded } from '@mui/icons-material';

import { IconButton } from './IconButton';

export default {
    title: 'IconButton',
    component: IconButton
};

export const IconButtons = () =>
    <Box sx={{ display: 'flex', alignContent: 'center', textAlign: 'center' }}>
        <Box sx={{ mr: 8 }}>
            <Typography variant='body1' color='primary'>Default Icon</Typography>
            <IconButton
                size='medium'
                sx={{ mt: 2 }}
            />
        </Box>

        <Box>
            <Typography variant='body1' color='primary'>Download Icon</Typography>
            <IconButton
                icon={<DownloadRounded />}
                sx={{ mt: 2 }}
            />
        </Box>
    </Box>;
