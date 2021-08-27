// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import {
    Route,
    useHistory,
    Switch,
    generatePath
} from 'react-router-dom';

import { getApplication, getApplications, HttpResponseApplications2, ShortInfoWithEnvironment, HttpResponseApplications } from '../api/api';
import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';

import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { DocumentationContainerScreen } from '../documentation/container';
import { withRouteApplicationProps } from '../utils/route';
import { RouteNotFound } from '../components/notfound';
import { PickEnvironment, isEnvironmentValidFromUri } from '../components/pickEnvironment';
import { useGlobalContext } from '../stores/notifications';



export const DocumentationScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { setNotification, currentEnvironment, currentApplicationId } = useGlobalContext();
    console.log('screen', currentEnvironment, currentApplicationId);

    const routeApplicationProps = withRouteApplicationProps('documentation');
    const applicationId = routeApplicationProps.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplications2);
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

    if (!isEnvironmentValidFromUri(routeApplicationProps, applications, currentApplicationId, currentEnvironment)) {
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
            to: generatePath('/documentation/application/:applicationId/overview', {
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
        applicationId,
        environment: currentEnvironment,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer routes={routes} />
                </div>

                <Route path="/documentation/application/:applicationId/:environment">
                    <div className="right item flex-end">
                        <ApplicationsChanger applications={applications} applicationId={applicationId} environment={currentEnvironment} />
                    </div>
                </Route>
            </div>

            <Switch>
                <Route path="/documentation/application/:applicationId/:environment">
                    <DocumentationContainerScreen application={application} environment={currentEnvironment} />
                </Route>
                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
};
