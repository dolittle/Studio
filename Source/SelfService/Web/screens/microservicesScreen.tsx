// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { Route, useNavigate, Routes, generatePath } from 'react-router-dom';

import { ShortInfoWithEnvironment, HttpResponseMicroservices, getMicroservices } from '../api/api';
import { HttpResponseApplication, getApplications, getApplication, HttpResponseApplications } from '../api/application';

import { Microservice } from '../microservice/microservices/microservices';
import { MicroserviceNewScreen } from '../microservice/microserviceNewScreen';
import { MicroserviceViewScreen } from '../microservice/microserviceViewScreen';
import { LayoutWithSidebar, getMenuWithApplication } from '../layout/layoutWithSidebar';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../application/applicationScreen.scss';

import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from '../stores/microservice';
import { useGlobalContext } from '../stores/notifications';

import { isEnvironmentValidFromUri, PickEnvironment } from '../components/pickEnvironment';
import { RouteNotFound } from '../components/notfound';
import { TopNavBar } from '../components/topNavBar';

import { withRouteApplicationState } from './withRouteApplicationState';

import { Typography } from '@mui/material';

export const MicroservicesScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const { setNotification } = useGlobalContext();
    const currentEnvironment = routeApplicationParams.environment;
    const currentApplicationId = routeApplicationParams.applicationId;

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
            getMicroservices(currentApplicationId),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            if (!applicationData?.id) {
                const href = `/problem`;
                navigate(href);
                return;
            }

            setApplications(applicationsData.applications);
            setApplication(applicationData);
            mergeMicroservicesFromGit(applicationData.microservices);

            const microservicesData = values[2] as HttpResponseMicroservices;
            const microservices = microservicesData.microservices.filter(microservice => microservice.environment === currentEnvironment);
            mergeMicroservicesFromK8s(microservices);
            setLoaded(true);
        }).catch(error => {
            console.log(error);
            setNotification('Failed getting data from the server', 'error');
        });
    }, [currentEnvironment, currentApplicationId]);

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

    if (!isEnvironmentValidFromUri(applications, currentApplicationId, currentEnvironment)) {
        return (
            <PickEnvironment
                applications={applications}
                application={application}
                redirectTo={'/microservices/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getMenuWithApplication(navigate, application, currentEnvironment);

    const routes = [
        {
            path: '/microservices/application/:applicationId/:environment',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Microservices'
        },
        {
            path: '/microservices/application/:applicationId/:environment/overview',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Overview'
        },
        {
            path: '/microservices/application/:applicationId/:environment/create',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/create', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Create'
        },
        {
            path: '/microservices/application/:applicationId/:environment/edit',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/edit', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'Edit'
        },
        {
            path: '/microservices/application/:applicationId/:environment/view',
            to: generatePath(
                '/microservices/application/:applicationId/:environment/view', {
                applicationId: application.id,
                environment: currentEnvironment
            }),
            name: 'View'
        }
    ];



    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />
            <Routes>
                <Route
                    path="/overview"
                    element={<Microservice application={application} environment={currentEnvironment} />} />

                <Route
                    path="/create"
                    element={<MicroserviceNewScreen application={application} environment={currentEnvironment} />} />

                <Route
                    path="/view/:microserviceId"
                    element={<MicroserviceViewScreen application={application} environment={currentEnvironment} />} />

                <Route path='*' element={<RouteNotFound redirectUrl={'overview'} auto={true} />} />

            </Routes>
        </LayoutWithSidebar>
    );
});
