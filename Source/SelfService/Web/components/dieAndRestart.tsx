// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Link, Box, Typography } from '@mui/material';
import { useGlobalContext } from '../solutions/stores/notifications';


export const DieAndRestart: React.FunctionComponent = () => {
    const { lastMessage, lastError, errors } = useGlobalContext();
    const dump = {
        lastMessage,
        lastError,
    };
    useEffect(() => {
        localStorage.clear();
    }, []);


    return (
        <>

            <Typography variant='h1' my={2}>Something has gone terribly wrong</Typography>
            <p>Please click on the link below to try and recover</p>
            <Link component={RouterLink} to="/applications">
                Link
            </Link>
            <Box fontFamily="Monospace">
                <Typography variant='h1' my={2}>Help us, help you</Typography>
                <p>Take a screenshot of the below and get in touch with P&amp;D</p>
                <pre>{JSON.stringify(dump, null, '  ')}</pre>
            </Box>
        </>
    );
};
