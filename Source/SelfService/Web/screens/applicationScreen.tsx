// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {
    useEffect,
    useState
} from 'react';
import {
    Route,
    useHistory,
    Switch,
    generatePath
} from 'react-router-dom';
import { useSnackbar } from 'notistack';

import {
    getApplications,
    ShortInfoWithEnvironment,
    HttpResponseApplications,
    ShortInfo,
} from '../api/api';

import { Create } from '../application/create';
import {
    LayoutWithSidebar,
} from '../layout/layoutWithSidebar';

import { RouteNotFound } from '../components/notfound';

export const ApplicationScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);
    const [tenant, setTenant] = useState({} as ShortInfo);

    useEffect(() => {
        Promise.all([
            getApplications(),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;

            setApplications(applicationsData.applications);
            setTenant({
                id: applicationsData.id,
                name: applicationsData.name,
            });
            setLoaded(true);
        }).catch((error) => {
            console.log(error);
            enqueueSnackbar('Failed getting data from the server', { variant: 'error' });
        });
    }, []);

    if (!loaded) {
        return null;
    }

    const nav = [];


    return (
        <LayoutWithSidebar navigation={nav}>
            <Switch>

                <Route exact path="/application/create">
                    <Create tenant={tenant} />
                </Route>


            </Switch>

        </LayoutWithSidebar >
    );
};
