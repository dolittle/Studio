// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch, generatePath } from 'react-router-dom';

import { ShortInfoWithEnvironment } from '../api/api';

import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { PickEnvironment } from '../components/pickEnvironment';
import { InsightsContainerScreen } from '../insights/container';
import { useRouteApplicationProps } from '../utils/route';
import { RouteNotFound } from '../components/notfound';
import { useGlobalContext } from '../stores/notifications';
import { TopNavBar } from '../components/topNavBar';
import {
    HttpResponseApplication,
    getApplications,
    getApplication,
    HttpResponseApplications,
} from '../api/application';

export const InsightsScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { setError, currentEnvironment } = useGlobalContext();

    const routeApplicationProps = useRouteApplicationProps();
    const applicationId = routeApplicationProps.applicationId;
    const environment = currentEnvironment;

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        Promise.all([
            getApplications(),
            getApplication(applicationId),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            if (!applicationData?.id) {
                setError({ message: 'Application id is empty' });
                const href = `/problem`;
                history.push(href);
                return;
            }

            setApplications(applicationsData.applications);
            setApplication(applicationData);
            setLoaded(true);
        }).catch(error => {
            setError(error.stack);
            const href = `/problem`;
            history.push(href);
            return;
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
                applications={applications}
                application={application}
                redirectTo={'/insights/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getDefaultMenu(history, application.id, environment);

    const routes = [
        {
            path: '/insights/application/:applicationId',
            to: generatePath('/insights/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Insights'
        },

        {
            path: '/insights/application/:applicationId/:environment/overview',
            to: generatePath('/insights/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Overview'
        },
        {
            path: '/insights/application/:applicationId/:environment/runtime-v1',
            to: generatePath('/insights/application/:applicationId/:environment/runtime-v1', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Runtime Stats',
        },
    ];

    const redirectUrl = generatePath('/insights/application/:applicationId/:environment/overview', {
        applicationId,
        environment,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={applicationId} environment={currentEnvironment} />

            <Switch>
                <Route path="/insights/application/:applicationId/:environment">
                    <InsightsContainerScreen application={application} environment={environment} />
                </Route>
                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
};
