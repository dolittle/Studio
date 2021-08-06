// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


export const DieAndRestart: React.FunctionComponent = () => {

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

        </>
    );
};
