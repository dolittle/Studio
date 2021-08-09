// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch, generatePath, useRouteMatch } from 'react-router-dom';

import { getApplication, getApplications, HttpResponseApplications2, ShortInfoWithEnvironment, HttpResponseApplications } from '../api/api';
import { EnvironmentChanger } from '../application/environmentChanger';
import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';
import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { PickEnvironment } from '../components/pickEnvironment';
import { InsightsContainerScreen } from '../insights/container';
import { withRouteApplicationProps } from '../utils/route';
import { RouteNotFound } from '../components/notfound';
import { useGlobalContext } from '../stores/notifications';
import { BreadcrumbWithRedirect, BreadcrumbWithRedirectProps } from '../components/breadCrumbWithRedirect';


export const InsightsScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { setError, currentEnvironment } = useGlobalContext();
    const topLevelMatch = useRouteMatch();

    const routeApplicationProps = withRouteApplicationProps('insights');
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
                application={application}
                redirectTo={'/insights/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getDefaultMenu(history, application.id, environment);

    const routes = [
        // Insights
        {
            path: '/insights/application/:applicationId',
            breadcrumb: BreadcrumbWithRedirect,
            props: {
                url: `${topLevelMatch.url}/${environment}/overview`,
                name: 'Insights'
            } as BreadcrumbWithRedirectProps,
        },
        {
            path: '/insights/application/:applicationId/:environment/overview',
            breadcrumb: 'Overview'
        },
        {
            path: '/insights/application/:applicationId/:environment/runtime-v1',
            breadcrumb: 'Runtime Stats'
        },

    ];

    const redirectUrl = generatePath('/insights/application/:applicationId/:environment/overview', {
        applicationId,
        environment,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer routes={routes} />
                </div>

                <div className="right item flex-end">
                    <EnvironmentChanger application={application} environment={environment} />
                    <ApplicationsChanger applications={applications} current={applicationId} />
                </div>
            </div>

            <Switch>
                <Route path="/insights/application/:applicationId/:environment">
                    <InsightsContainerScreen application={application} environment={environment} />
                </Route>
                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
};
