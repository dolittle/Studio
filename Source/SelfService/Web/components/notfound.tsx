// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Route, useHistory, Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


type Props = {
    redirectUrl: string
    auto?: boolean
};

export const RouteNotFound: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    if (props!.auto) {
        history.push(props!.redirectUrl);
        return null;
    }

    return (
        <>
            <Route>
                <h1>We are unable to find this link</h1>
                <Link component={RouterLink} to={props!.redirectUrl}>
                    Link
                </Link>
            </Route>
        </>
    );
};
