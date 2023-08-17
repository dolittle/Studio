// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, useNavigate, Routes, generatePath } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../spaces/applications/applicationScreen.scss';

import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from './stores/microservice';

import { getMicroservices } from '../apis/solutions/api';
import { getApplicationsListing, getApplication, HttpResponseApplication, HttpResponseApplications } from '../apis/solutions/application';

import { Microservice } from './microservice/microservices/microservices';
import { MicroserviceNewScreen } from './microservice/microserviceNewScreen';
import { MicroserviceViewScreen } from './microservice/microserviceViewScreen';
import { LayoutWithSidebar, getMenuWithApplication } from '../components/layout/layoutWithSidebar';
import { RouteNotFound } from '../components/notfound';
//import { TopNavBar } from '../components/layout/topNavBar';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

export const MicroservicesScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const { hasOneCustomer } = useGlobalContext();

    //const [applications, setApplications] = useState({} as ShortInfo[]);
    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentApplicationId = routeApplicationParams.applicationId;
    const href = `/problem`;

    useEffect(() => {
        if (!currentApplicationId) return;

        Promise.all([
            getApplicationsListing(),
            getApplication(currentApplicationId),
            getMicroservices(currentApplicationId),
        ]).then(values => {
            //const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            if (!applicationData?.id) {
                navigate(href);
                return;
            }

            //setApplications(applicationsData.applications);
            setApplication(applicationData);

            mergeMicroservicesFromGit(applicationData.microservices);
            mergeMicroservicesFromK8s(values[2].microservices);

            setIsLoaded(true);
        }).catch(() => {
            // TODO DEV: Remove
            navigate(href);
            return;
        });
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    // TODO DEV: Remove?
    if (application.id === '') {
        navigate(href);
        return null;
    }

    const nav = getMenuWithApplication(navigate, application, hasOneCustomer);

    // TODO DEV: This is used by breadcrumbs?
    // const routes = [
    //     {
    //         path: '/microservices/application/:applicationId/',
    //         to: generatePath('/microservices/application/:applicationId/overview', {
    //             applicationId: application.id,
    //         }),
    //         name: 'Microservices',
    //     },
    //     {
    //         path: '/microservices/application/:applicationId/overview',
    //         to: generatePath('/microservices/application/:applicationId/overview', {
    //             applicationId: application.id,
    //         }),
    //         name: 'Overview',
    //     },
    //     {
    //         path: '/microservices/application/:applicationId/create',
    //         to: generatePath('/microservices/application/:applicationId/create', {
    //             applicationId: application.id,
    //         }),
    //         name: 'Create',
    //     },
    //     {
    //         path: '/microservices/application/:applicationId/edit',
    //         to: generatePath('/microservices/application/:applicationId/edit', {
    //             applicationId: application.id,
    //         }),
    //         name: 'Edit',
    //     },
    //     {
    //         path: '/microservices/application/:applicationId/view',
    //         to: generatePath('/microservices/application/:applicationId/view', {
    //             applicationId: application.id,
    //         }),
    //         name: 'View',
    //     },
    // ];

    return (
        <LayoutWithSidebar navigation={nav}>
            {/* <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} /> */}

            <Routes>
                <Route path="/overview" element={<Microservice application={application} />} />
                <Route path="/create" element={<MicroserviceNewScreen application={application} />} />
                <Route path="/view/:microserviceId" element={<MicroserviceViewScreen application={application} />} />
                <Route path='*' element={<RouteNotFound redirectUrl={'overview'} auto={true} />} />
            </Routes>
        </LayoutWithSidebar>
    );
});
