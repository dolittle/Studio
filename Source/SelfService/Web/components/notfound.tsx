// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Route, useNavigate, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';


type Props = {
    redirectUrl: string
    auto?: boolean
};

export const RouteNotFound: React.FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    if (props!.auto) {
        navigate(props!.redirectUrl);
        return null;
    }

    return (
        <>
            <Route element={
                <>
                    <Typography variant='h1' my={2}>We are unable to find this link</Typography><Link component={RouterLink} to={props!.redirectUrl}>
                        Link
                    </Link>
                </>
            } />
        </>
    );
};
