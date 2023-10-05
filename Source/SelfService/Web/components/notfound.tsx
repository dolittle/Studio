// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link as RouterLink, Navigate } from 'react-router-dom';

import { Link, Typography } from '@mui/material';

export type RouteNotFoundProps = {
    redirectUrl: string;
    auto?: boolean;
};

export const RouteNotFound = ({ auto, redirectUrl }: RouteNotFoundProps) =>
    <>
        {auto ?
            <Navigate to={redirectUrl} replace={true} /> :
            <>
                <Typography variant='h1' my={2}>We are unable to find this link</Typography>
                <Link component={RouterLink} to={redirectUrl}>Link</Link>
            </>
        }
    </>;
