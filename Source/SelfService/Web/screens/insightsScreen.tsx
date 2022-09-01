// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch, generatePath } from 'react-router-dom';

import { ShortInfoWithEnvironment } from '../api/api';

import { getMenuWithApplication, LayoutWithSidebar } from '../layout/layoutWithSidebar';
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { PickEnvironment } from '../components/pickEnvironment';
import { InsightsContainerScreen } from '../insights/container';
import { RouteNotFound } from '../components/notfound';
import { useGlobalContext } from '../stores/notifications';
import { TopNavBar } from '../components/topNavBar';
import {
    HttpResponseApplication,
    getApplications,
    getApplication,
    HttpResponseApplications
} from '../api/application';
import { withRouteApplicationState } from './withRouteApplicationState';
import { Typography } from '@mui/material';

export const InsightsScreen: React.FunctionComponent = withRouteApplicationState(({ routeApplicationParams }) => {
    const history = useHistory();
    const { setError } = useGlobalContext();
    const currentEnvironment = routeApplicationParams.environment;
    const currentApplicationId = routeApplicationParams.applicationId;

    const environment = currentEnvironment;

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!currentEnvironment || !currentApplicationId) {
            return;
        }
        Promise.all([
            getApplications(),
            getApplication(currentApplicationId),
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
    }, [currentApplicationId, currentEnvironment]);

    if (!loaded) {
        return null;
    }

    if (application.id === '') {
        return (
            <>
                <Typography variant='h1' my={2}>Application with this environment not found</Typography>
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

    const nav = getMenuWithApplication(history, application, currentEnvironment);

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
        applicationId: currentApplicationId,
        environment,
    });

    return (
        <>
            {/*         <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />

            <Switch>
                <Route path="/insights/application/:applicationId/:environment">
                    <InsightsContainerScreen application={application} environment={environment} />
                </Route>
                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar> */}
        </>
    );
});
