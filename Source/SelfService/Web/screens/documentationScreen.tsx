// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import {
    Route,
    useHistory,
    Switch,
    generatePath
} from 'react-router-dom';

import { ShortInfoWithEnvironment } from '../api/api';
import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';

import { DocumentationContainerScreen } from '../documentation/container';
import { useRouteApplicationParams } from '../utils/route';
import { RouteNotFound } from '../components/notfound';
import { PickEnvironment, isEnvironmentValidFromUri } from '../components/pickEnvironment';
import { useGlobalContext } from '../stores/notifications';
import { TopNavBar } from '../components/topNavBar';
import {
    HttpResponseApplication,
    getApplications,
    getApplication,
    HttpResponseApplications,
} from '../api/application';
import { withRouteApplicationState } from './withRouteApplicationState';



export const DocumentationScreen: React.FunctionComponent = withRouteApplicationState(() => {
    const history = useHistory();
    const { setNotification, currentEnvironment, currentApplicationId } = useGlobalContext();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState([] as ShortInfoWithEnvironment[]);
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
                const href = `/problem`;
                history.push(href);
                return;
            }

            // TODO this should be unique
            // TODO also when we have more than one application and more than one environment we should default to something.
            setApplications(applicationsData.applications);
            setApplication(applicationData);
            setLoaded(true);
        }).catch((error) => {
            console.log(error);
            setNotification('Failed getting data from the server', 'error');
        });
    }, [currentApplicationId, currentEnvironment]);

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

    if (!isEnvironmentValidFromUri(applications, currentApplicationId, currentEnvironment)) {
        return (
            <PickEnvironment
                applications={applications}
                application={application}
                redirectTo={'/documentation/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getDefaultMenu(history, application.id, currentEnvironment);

    const routes = [
        {
            path: '/documentation/application/:applicationId/:environment',
            to: generatePath('/documentation/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Documentation'
        },
        {
            path: '/documentation/application/:applicationId/:environment/overview',
            to: generatePath('/documentation/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Overview'
        },
        {
            path: '/documentation/application/:applicationId/:environment/container-registry-info',
            to: generatePath('/documentation/application/:applicationId/:environment/container-registry-info', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Container Registry Info',
        },
        {
            path: '/documentation/application/:applicationId/:environment/verify-kubernetes-access',
            to: generatePath('/documentation/application/:applicationId/:environment/verify-kubernetes-access', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Verify access to kubernetes',
        }
    ];

    const redirectUrl = generatePath('/documentation/application/:applicationId/:environment/overview', {
        applicationId: currentApplicationId,
        environment: currentEnvironment,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />

            <Switch>
                <Route path="/documentation/application/:applicationId/:environment">
                    <DocumentationContainerScreen application={application} environment={currentEnvironment} />
                </Route>
                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
});
