// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';


type RouteNotFoundProps = {
    redirectUrl: string
    auto?: boolean
};

export const RouteNotFound: React.FunctionComponent<RouteNotFoundProps> = (props) => {
    return (
        <>
            {props.auto
                ? <Navigate to={props.redirectUrl} replace={true} />
                : <>
                    <Typography variant='h1' my={2}>We are unable to find this link</Typography>
                    <Link component={RouterLink} to={props.redirectUrl}>Link</Link>
                </>
            }
        </>
    );
};
