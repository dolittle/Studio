// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { AigonIsLostSvg, Button, Icon } from '@dolittle/design-system';

// TODO: Add to Design System and combine with MaintenanceMessage.
export const Problem = () => {
    // Dunno, I leave this just in case from old code.
    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <>
            <Stack sx={{ height: 1, minHeight: '100vh', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <AigonIsLostSvg sx={{ width: 1, minWidth: 200, maxWidth: 342, height: 'auto' }} />

                <Typography variant='h1' sx={{ mt: 8 }}>Houston, we have a problem...</Typography>

                <Typography variant='subtitle1' sx={{ mt: 3 }}>
                    Looks like we’re having issues with our server. Don’t worry, we’re working on a fix.
                </Typography>
                <Typography variant='subtitle1' sx={{ mb: 8 }}>
                    Here’s a few things you can try in the meantime:
                </Typography>

                <Box>
                    <Button label='Return home' startWithIcon='HomeRounded' href='/' sx={{ mr: 3 }} />
                    <Button label='Send us an email' startWithIcon='EmailRounded' href='mailto:support@dolittle.com' />
                </Box>

                <Box sx={{ mt: 18, cursor: 'pointer' }} onClick={() => window.location.pathname = '/selfservice/'}>
                    <Icon icon='AigonixLightLogo' sx={{ width: 166, height: 28 }} />
                </Box>
            </Stack>
        </>
    );
};
