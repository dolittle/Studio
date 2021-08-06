// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, useRouteMatch, Switch, generatePath } from 'react-router-dom';

import { getApplication, getApplications, HttpResponseApplications2, ShortInfoWithEnvironment, HttpResponseApplications, HttpResponseMicroservices, getMicroservices } from '../api/api';

import { MicroservicesOverviewScreen } from '../microservice/overview';
import { MicroserviceNewScreen } from '../microservice/microserviceNewScreen';
import { MicroserviceEditScreen } from '../microservice/microserviceEditScreen';
import { MicroserviceViewScreen } from '../microservice/microserviceViewScreen';

import { PodViewScreen } from './podViewScreen';
import { EnvironmentChanger } from '../application/environmentChanger';
import { LayoutWithSidebar, getDefaultMenu } from '../layout/layoutWithSidebar';



// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';


import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from '../stores/microservice';

import { BreadCrumbContainer } from '../layout/breadcrumbs';

import { withRouteApplicationProps } from '../utils/route';
import { BreadcrumbWithRedirect, BreadcrumbWithRedirectProps } from '../components/breadCrumbWithRedirect';

import { getCurrentEnvironment } from '../stores/notifications';
import { PickEnvironment } from '../components/pickEnvironment';
import { RouteNotFound } from '../components/notfound';
import { Create } from '../environment/create';



export const EnvironmentScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const topLevelMatch = useRouteMatch();
    const routeApplicationProps = withRouteApplicationProps('environment');
    const applicationId = routeApplicationProps.applicationId;
    const environment = getCurrentEnvironment();
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

    if (environment === '') {
        return (
            <PickEnvironment
                application={application}
                redirectTo={'/environment/application/:applicationId/create'}
                openModal={true} />
        );
    }

    const nav = getDefaultMenu(history, applicationId, environment);

    const routes = [
        {
            path: '/environment/application/:applicationId',
            breadcrumb: BreadcrumbWithRedirect,
            props: {
                url: `${topLevelMatch.url}/create`,
                name: 'Environment'
            } as BreadcrumbWithRedirectProps,
        },
        {
            path: '/environment/application/:applicationId/create',
            breadcrumb: 'Create',
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
