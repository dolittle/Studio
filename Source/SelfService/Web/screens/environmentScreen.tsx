// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import {
    Route,
    useHistory,
    Switch,
    generatePath
} from 'react-router-dom';

import {
    getApplication,
    HttpResponseApplications2
} from '../api/api';

import {
    LayoutWithSidebar,
    getDefaultMenu
} from '../layout/layoutWithSidebar';

import { BreadCrumbContainer } from '../layout/breadcrumbs';

import { withRouteApplicationProps } from '../utils/route';
import { useGlobalContext } from '../stores/notifications';
import { RouteNotFound } from '../components/notfound';
import { Create } from '../environment/create';

export const EnvironmentScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const routeApplicationProps = withRouteApplicationProps('environment');
    const { currentEnvironment } = useGlobalContext();
    const applicationId = routeApplicationProps.applicationId;
    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplication(applicationId)
        ]).then(values => {
            const applicationData = values[0];
            setApplication(applicationData);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }

    if (application.id === '') {
        return (
            <>
                <h1>Application with this environment not found</h1>
            </>
        );
    }

    const nav = getDefaultMenu(history, applicationId, currentEnvironment);

    const routes = [
        {
            path: '/environment/application/:applicationId',
            to: generatePath('/environment/application/:applicationId/create', {
                applicationId: application.id,
            }),
            name: 'Environment'
        },

        {
            path: '/environment/application/:applicationId/create',
            to: generatePath('/environment/application/:applicationId/create', {
                applicationId: application.id,
            }),
            name: 'Create'
        }
    ];


    const redirectUrl = generatePath('/environment/application/:applicationId/create', {
        applicationId,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer routes={routes} />
                </div>
            </div>

            <Switch>
                <Route exact path="/environment/application/:applicationId/create">
                    <Create application={application} />
                </Route>

                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
};
