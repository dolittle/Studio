// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, generatePath, useRouteMatch, Switch } from 'react-router-dom';

import { getApplication, getApplications, HttpResponseApplications2, ShortInfoWithEnvironment, HttpResponseApplications, HttpResponseMicroservices, getMicroservices } from '../api/api';

import { EnvironmentChanger } from '../application/environmentChanger';


import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';


import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from '../stores/microservice';
import { BusinessMomentsContainerScreen } from '../businessMoments/container';


import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { isEnvironmentValidFromUri, PickEnvironment } from '../components/pickEnvironment';
import { withRouteApplicationProps } from '../utils/route';
import { RouteNotFound } from '../components/notfound';
import { useGlobalContext } from '../stores/notifications';
import { BreadcrumbWithRedirect, BreadcrumbWithRedirectProps } from '../components/breadCrumbWithRedirect';

export const BusinessMomentsScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const { currentEnvironment } = useGlobalContext();
    const topLevelMatch = useRouteMatch();
    const routeApplicationProps = withRouteApplicationProps('business-moments');
    const applicationId = routeApplicationProps.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplications(),
            getApplication(applicationId),
            getMicroservices(applicationId),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            if (!applicationData?.id) {
                const href = `/problem`;
                history.push(href);
                return;
            }

            setApplications(applicationsData.applications);
            setApplication(applicationData);
            mergeMicroservicesFromGit(applicationData.microservices);

            const microservicesData = values[2] as HttpResponseMicroservices;
            const microservices = microservicesData.microservices.filter(microservice => microservice.environment === currentEnvironment);
            mergeMicroservicesFromK8s(microservices);
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

    if (!isEnvironmentValidFromUri(routeApplicationProps, applications, currentEnvironment)) {
        return (
            <PickEnvironment
                applications={applications}
                application={application}
                redirectTo={'/business-moments/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getDefaultMenu(history, application.id, currentEnvironment);

    const routes = [
        {
            path: '/business-moments/application/:applicationId/:environment',
            breadcrumb: BreadcrumbWithRedirect,
            props: {
                url: `${topLevelMatch.url}/${currentEnvironment}/overview`,
                name: 'Business Moments'
            } as BreadcrumbWithRedirectProps,
        },
        {
            path: '/business-moments/application/:applicationId/:environment/overview',
            breadcrumb: 'Overview',
        },
        {
            path: '/business-moments/application/:applicationId/:environment/editor/:businessMomentId/microservice/:microserviceId',
            breadcrumb: 'Editor',
        }
    ];


    const redirectUrl = generatePath('/business-moments/application/:applicationId/:environment/overview', {
        applicationId,
        environment: currentEnvironment,
    });

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer routes={routes} />
                </div>

                <div className="right item flex-end">
                    <EnvironmentChanger application={application} environment={currentEnvironment} />
                    <ApplicationsChanger applications={applications} current={applicationId} />
                </div>
            </div>

            <Switch>
                <Route path="/business-moments/application/:applicationId/:environment">
                    <BusinessMomentsContainerScreen application={application} environment={currentEnvironment} />
                </Route>

                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
};
