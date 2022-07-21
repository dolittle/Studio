// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { ShortInfoWithEnvironment } from '../api/api';
import { getApplications, HttpResponseApplications } from '../api/application';
import { Building } from '../application/building';

import { Create } from '../application/create/create';
import { LoginWrapper } from '../layout/loginWrapper';

export const ApplicationScreen: React.FunctionComponent = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [applications, setApplications] = useState([] as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    // TODO hack to make it work, not the final solution
    if (!window.location.pathname.includes('/application/building/')) {
        useEffect(() => {
            Promise.all([
                getApplications(),
            ]).then(values => {
                const applicationsData = values[0] as HttpResponseApplications;
                setApplications(applicationsData.applications);
                setLoaded(true);
            }).catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed getting data from the server', { variant: 'error' });
            });
        }, []);
    } else {
        useEffect(() => {
            setLoaded(true);
        }, []);
    }

    if (!loaded) {
        return null;
    }

    return (
        <LoginWrapper>
            <Switch>
                <Route exact path="/application/create">
                    <Create />
                </Route>

                <Route exact path="/application/building/:applicationId">
                    <Building />
                </Route>
            </Switch>
        </LoginWrapper >
    );
};
