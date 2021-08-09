// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { Link, Box } from '@material-ui/core';
import { useGlobalContext } from '../stores/notifications';


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

            <h1>Something has gone terribly wrong</h1>
            <p>Please click on the link below to try and recover</p>
            <Link component={RouterLink} to="/applications">
                Link
            </Link>
            <Box fontFamily="Monospace">
                <h1>Help us, help you</h1>
                <p>Take a screenshot of the below and get in touch with P&amp;D</p>
                <pre>{JSON.stringify(dump, null, '  ')}</pre>
            </Box>
        </>
    );
};
