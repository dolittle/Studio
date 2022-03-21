// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import {
    Route,
    useHistory,
    generatePath,
    Switch
} from 'react-router-dom';


import { getDefaultMenu, LayoutWithSidebar } from '../layout/layoutWithSidebar';


// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';

import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from '../stores/microservice';
import { BusinessMomentsContainerScreen } from '../businessMoments/container';
import { isEnvironmentValidFromUri, PickEnvironment } from '../components/pickEnvironment';
import { RouteNotFound } from '../components/notfound';
import { useGlobalContext } from '../stores/notifications';
import { TopNavBar } from '../components/topNavBar';
import { ShortInfoWithEnvironment, getMicroservices, HttpResponseMicroservices } from '../api/api';
import { HttpResponseApplication, getApplications, getApplication, HttpResponseApplications } from '../api/application';
import { withRouteApplicationState } from './withRouteApplicationState';

export const BusinessMomentsScreen: React.FunctionComponent = withRouteApplicationState(({routeApplicationParams: routeApplicationProps}) => {
    const history = useHistory();
    const { currentEnvironment, currentApplicationId } = useGlobalContext();
    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState([] as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplications(),
            getApplication(currentApplicationId),
            getMicroservices(currentApplicationId),
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

    if (!isEnvironmentValidFromUri(routeApplicationProps, applications, currentApplicationId, currentEnvironment)) {
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
            to: generatePath('/business-moments/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Business Moments',
        },
        {
            path: '/business-moments/application/:applicationId/:environment/overview',
            to: generatePath('/business-moments/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Overview',
        },
        {
            path: '/business-moments/application/:applicationId/:environment/editor/:businessMomentId/microservice/:microserviceId',
            to: '/business-moments/application/:applicationId/:environment/editor/:businessMomentId/microservice/:microserviceId',
            name: 'Editor (TODO)',
        }
    ];


    const redirectUrl = generatePath('/business-moments/application/:applicationId/:environment/overview', {
        applicationId: currentApplicationId,
        environment: currentEnvironment,
    });


    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />


            <Switch>
                <Route path="/business-moments/application/:applicationId/:environment">
                    <BusinessMomentsContainerScreen application={application} environment={currentEnvironment} />
                </Route>

                <RouteNotFound redirectUrl={redirectUrl} />
            </Switch>
        </LayoutWithSidebar >
    );
});
