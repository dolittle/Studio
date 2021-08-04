// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

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
import { PickEnvironment } from '../components/pickEnvironment';
import { withRouteApplicationProps } from '../utils/route';
import { BreadcrumbWithRedirect, BreadcrumbWithRedirectProps } from '../components/breadCrumbWithRedirect';

export const MicroservicesScreen: React.FunctionComponent = () => {
    const history = useHistory();
    const topLevelMatch = useRouteMatch();
    const routeApplicationProps = withRouteApplicationProps('microservices');
    const applicationId = routeApplicationProps.applicationId;
    const environment = routeApplicationProps.environment;

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

    const nav = getDefaultMenu(history, application.id, environment);

    const environmentOnClick = (applicationId: string, environment: string) => {
        const href = `/microservices/application/${applicationId}/${environment}`;
        history.push(href);
    };

    const routes = [
        {
            path: '/microservices/application/:applicationId/:environment',
            breadcrumb: BreadcrumbWithRedirect,
            props: {
                url: `${topLevelMatch.url}/${environment}/overview`,
                name: 'Microservices'
            } as BreadcrumbWithRedirectProps,
        },
        {
            path: '/microservices/application/:applicationId/:environment/overview',
            breadcrumb: 'Overview',
        },
        {
            path: '/microservices/application/:applicationId/:environment/create',
            breadcrumb: 'Create',
        },
        {
            path: '/microservices/application/:applicationId/:environment/edit',
            breadcrumb: 'Edit',
        },
        {
            path: '/microservices/application/:applicationId/:environment/view',
            breadcrumb: 'View',
        }
    ];

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer routes={routes} />
                </div>
                <Route path="/microservices/application/:applicationId/:environment">
                    <div className="right item flex-end">
                        <EnvironmentChanger application={application} environment={environment} />
                        <ApplicationsChanger applications={applications} current={applicationId} />
                    </div>
                </Route>
            </div>

            <Route exact path="/microservices/application/:applicationId/:environment/overview">
                <MicroservicesOverviewScreen application={application} />
            </Route>

            <Route exact path="/microservices/application/:applicationId/:environment/create">
                <MicroserviceNewScreen application={application} />
            </Route>

            <Route exact path="/microservices/application/:applicationId/:environment/edit/:microserviceId">
                <MicroserviceEditScreen />
            </Route>

            <Route exact path="/microservices/application/:applicationId/:environment/view/:microserviceId">
                <MicroserviceViewScreen />
            </Route>

            <Route exact path="/microservices/application/:applicationId/:environment/pod/view/:podName/logs">
                <PodViewScreen />
            </Route>

            <Route exact path="/microservices/application/:applicationId/pick-environment">
                <PickEnvironment application={application} onClick={environmentOnClick} />
            </Route>

        </LayoutWithSidebar>
    );
};
