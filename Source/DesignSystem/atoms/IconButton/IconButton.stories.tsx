// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box, Fade, Slide, Typography } from '@mui/material';
import { DownloadRounded, CloseRounded } from '@mui/icons-material';

import { IconButton } from './IconButton';

export default {
    title: 'IconButton',
    component: IconButton
};

export const IconButtons = () => {
    const [onClose, setOnClose] = useState(true);
    const [onDownload, setOnDownload] = useState(true);

    return (
        <Box sx={{ display: 'flex', alignContent: 'center', textAlign: 'center' }}>
            <Box sx={{ mr: 8 }}>
                <Typography variant='body1' color='secondary'>Default Icon</Typography>
                <IconButton
                    icon={
                        <Fade
                            in={onClose}
                            timeout={500}
                            onExited={() => setTimeout(() => setOnClose(true), 1500)}
                        >
                            {<CloseRounded />}
                        </Fade>
                    }
                    sx={{ mt: 2 }}
                    onClick={() => setOnClose(false)}
                />
            </Box>

            <Box>
                <Typography variant='body1' color='secondary'>Download Icon</Typography>
                <IconButton
                    icon={
                        <Slide
                            direction='up'
                            in={onDownload}
                            timeout={500}
                            onExited={() => setTimeout(() => setOnDownload(true), 1500)}
                        >
                            {<DownloadRounded />}
                        </Slide>
                    }
                    sx={{ mt: 2 }}
                    onClick={() => setOnDownload(false)}
                />
            </Box>
        </Box>
    );
};
