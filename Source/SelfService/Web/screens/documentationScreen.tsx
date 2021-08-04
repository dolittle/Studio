// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, Switch, useRouteMatch, useLocation } from 'react-router-dom';

import { getApplication, getApplications, HttpResponseApplications2, ShortInfoWithEnvironment, HttpResponseApplications, HttpResponseMicroservices, getMicroservices } from '../api/api';


import { EnvironmentChanger } from '../application/environmentChanger';


import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';
import { ApplicationsChanger } from '../application/applicationsChanger';


import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from '../stores/microservice';

import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { PickEnvironment } from '../components/pickEnvironment';
import { DocumentationContainerScreen } from '../documentation/container';
import { withRouteApplicationProps } from '../utils/route';
import { BreadcrumbWithRedirect, BreadcrumbWithRedirectProps } from '../components/breadCrumbWithRedirect';


export const DocumentationScreen: React.FunctionComponent = () => {
    const { pathname } = useLocation();
    const history = useHistory();

    const topLevelMatch = useRouteMatch();

    const routeApplicationProps = withRouteApplicationProps('documentation');
    const applicationId = routeApplicationProps.applicationId;
    const environment = routeApplicationProps.environment;

    const [application, setApplication] = useState({} as HttpResponseApplications2);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    // Little hack to force redirect
    //if (['', '/', uriWithAppPrefix('/')].includes(pathname)) {
    //    window.location.href = uriWithAppPrefix('/');
    //    return null;
    //}

    useEffect(() => {
        Promise.all([
            getApplications(),
            getApplication(applicationId),
            getMicroservices(applicationId),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];
            // TODO this should be unique
            // TODO also when we have more than one application and more than one environment we should default to something.
            setApplications(applicationsData.applications);
            setApplication(applicationData);
            mergeMicroservicesFromGit(applicationData.microservices);


            const microservicesData = values[2] as HttpResponseMicroservices;
            const microservices = microservicesData.microservices.filter(microservice => microservice.environment === environment);
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


    const nav = getDefaultMenu(history, application.id, environment, '');

    const environmentOnClick = (applicationId: string, environment: string) => {
        const href = `/documentation/application/${applicationId}/${environment}/overview`;
        history.push(href);
    };

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
                <Route exact path="/documentation/application/:applicationId/pick-environment">
                    <PickEnvironment application={application} onClick={environmentOnClick} />
                </Route>

                <Route path="/documentation/application/:applicationId/:environment">
                    <DocumentationContainerScreen application={application} />
                </Route>
                <Route>
                    <h1>TODO</h1>
                    <p>{pathname}</p>
                </Route>
            </Switch>
        </LayoutWithSidebar >
    );
};
