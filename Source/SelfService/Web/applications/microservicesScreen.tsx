// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, useNavigate, Routes, generatePath } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../spaces/applications/applicationScreen.scss';

import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from './stores/microservice';

import { ShortInfoWithEnvironment, HttpResponseMicroservices, getMicroservices } from '../apis/solutions/api';
import { HttpResponseApplication, getApplications, getApplication, HttpResponseApplications } from '../apis/solutions/application';

import { Microservice } from './microservice/microservices/microservices';
import { MicroserviceNewScreen } from './microservice/microserviceNewScreen';
import { MicroserviceViewScreen } from './microservice/microserviceViewScreen';
import { LayoutWithSidebar, getMenuWithApplication } from '../components/layout/layoutWithSidebar';
import { isEnvironmentValidFromUrl, PickEnvironment } from '../components/pickEnvironment';
import { RouteNotFound } from '../components/notfound';
import { TopNavBar } from '../components/layout/topNavBar';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

export const MicroservicesScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const { hasOneCustomer } = useGlobalContext();
    const navigate = useNavigate();

    const currentEnvironment = routeApplicationParams.environment;
    const currentApplicationId = routeApplicationParams.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState({} as ShortInfoWithEnvironment[]);
    const [isLoaded, setIsLoaded] = useState(false);

    const href = `/problem`;

    useEffect(() => {
        if (!currentEnvironment || !currentApplicationId) {
            return;
        }

        Promise.all([
            getApplications(),
            getApplication(currentApplicationId),
            getMicroservices(currentApplicationId),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            if (!applicationData?.id) {
                navigate(href);
                return;
            }

            setApplications(applicationsData.applications);
            setApplication(applicationData);
            mergeMicroservicesFromGit(applicationData.microservices);

            const microservicesData = values[2] as HttpResponseMicroservices;
            const microservices = microservicesData.microservices.filter(microservice => microservice.environment === currentEnvironment);
            mergeMicroservicesFromK8s(microservices);
            setIsLoaded(true);
        }).catch(() => {
            navigate(href);
            return;
        });
    }, [currentEnvironment, currentApplicationId]);

    if (!isLoaded) return null;

    if (application.id === '') {
        navigate(href);
        return null;
    }

    if (!isEnvironmentValidFromUrl(applications, currentApplicationId, currentEnvironment)) {
        return (
            <PickEnvironment
                applications={applications}
                application={application}
                redirectTo={'/microservices/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getMenuWithApplication(navigate, application, currentEnvironment, hasOneCustomer);

    const routes = [
        {
            path: '/microservices/application/:applicationId/:environment',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Microservices',
        },
        {
            path: '/microservices/application/:applicationId/:environment/overview',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Overview',
        },
        {
            path: '/microservices/application/:applicationId/:environment/create',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/create', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Create',
        },
        {
            path: '/microservices/application/:applicationId/:environment/edit',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/edit', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Edit',
        },
        {
            path: '/microservices/application/:applicationId/:environment/view',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/view', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'View',
        },
    ];

    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />

            <Routes>
                <Route path="/overview" element={<Microservice application={application} environment={currentEnvironment} />} />
                <Route path="/create" element={<MicroserviceNewScreen application={application} environment={currentEnvironment} />} />
                <Route path="/view/:microserviceId" element={<MicroserviceViewScreen application={application} environment={currentEnvironment} />} />
                <Route path='*' element={<RouteNotFound redirectUrl={'overview'} auto={true} />} />
            </Routes>
        </LayoutWithSidebar>
    );
});
