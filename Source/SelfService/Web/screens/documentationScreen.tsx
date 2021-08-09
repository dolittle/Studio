// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch, useRouteMatch, generatePath } from 'react-router-dom';

import { getApplication, getApplications, HttpResponseApplications2, ShortInfoWithEnvironment, HttpResponseApplications } from '../api/api';
import { EnvironmentChanger } from '../application/environmentChanger';
import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';

import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { DocumentationContainerScreen } from '../documentation/container';
import { withRouteApplicationProps } from '../utils/route';
import { BreadcrumbWithRedirect, BreadcrumbWithRedirectProps } from '../components/breadCrumbWithRedirect';
import { RouteNotFound } from '../components/notfound';
import { PickEnvironment } from '../components/pickEnvironment';
import { useGlobalContext } from '../stores/notifications';


export const DocumentationScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { setNotification, currentEnvironment } = useGlobalContext();
    const topLevelMatch = useRouteMatch();

    const routeApplicationProps = withRouteApplicationProps('documentation');
    const applicationId = routeApplicationProps.applicationId;
    const environment = currentEnvironment;

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

    if (environment === '') {
        return (
            <PickEnvironment
                application={application}
                redirectTo={'/microservices/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getDefaultMenu(history, application.id, environment);

    const routes = [
        {
            path: '/documentation/application/:applicationId/:environment',
            breadcrumb: BreadcrumbWithRedirect,
            props: {
                url: `${topLevelMatch.url}/${environment}/overview`,
                name: 'Documentation'
            } as BreadcrumbWithRedirectProps,
        },
        {
            path: '/documentation/application/:applicationId/:environment/overview',
            breadcrumb: 'Overview',
        },
        {
            path: '/documentation/application/:applicationId/:environment/container-registry-info',
            breadcrumb: 'Container Registry Info',
        },
        {
            path: '/documentation/application/:applicationId/:environment/verify-kubernetes-access',
            breadcrumb: 'Verify access to kubernetes',
        }
    ];

    const redirectUrl = generatePath('/documentation/application/:applicationId/:environment/overview', {
        applicationId,
        environment,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer routes={routes} />
                </div>

                <Route path="/documentation/application/:applicationId/:environment">
                    <div className="right item flex-end">
                        <EnvironmentChanger application={application} environment={environment} />
                        <ApplicationsChanger applications={applications} current={applicationId} />
                    </div>
                </Route>
            </div>

            <Switch>
                <Route path="/documentation/application/:applicationId/:environment">
                    <DocumentationContainerScreen application={application} environment={environment} />
                </Route>
                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
};
