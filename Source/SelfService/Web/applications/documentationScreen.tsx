// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, useNavigate, Routes, generatePath } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../spaces/applications/applicationScreen.scss';

import { ShortInfo } from '../apis/solutions/api';
import { HttpResponseApplication, getApplicationsListing, getApplication } from '../apis/solutions/application';

import { TopNavBar } from '../components/layout/topNavBar';
import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';
import { DocumentationContainerScreen } from './documentation/container';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

export const DocumentationScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const { hasOneCustomer } = useGlobalContext();
    const navigate = useNavigate();

    const currentApplicationId = routeApplicationParams.applicationId;

    //const [applications, setApplications] = useState([] as ShortInfo[]);
    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    const href = `/problem`;

    useEffect(() => {
        if (!currentApplicationId) {
            return;
        }

        Promise.all([
            getApplicationsListing(),
            getApplication(currentApplicationId),
        ]).then(values => {
            //const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            if (!applicationData?.id) {
                navigate(href);
                return;
            }

            // TODO this should be unique
            //setApplications(applicationsData.applications);
            setApplication(applicationData);
            setIsLoaded(true);
        }).catch(() => {
            navigate(href);
            return;
        });
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    if (application.id === '') {
        navigate(href);
        return null;
    }

    const nav = getMenuWithApplication(navigate, application, hasOneCustomer);

    // const routes = [
    //     {
    //         path: '/documentation/application/:applicationId/',
    //         to: generatePath('/documentation/application/:applicationId/overview', {
    //             applicationId: application.id,
    //         }),
    //         name: 'Documentation',
    //     },
    //     {
    //         path: '/documentation/application/:applicationId/overview',
    //         to: generatePath('/documentation/application/:applicationId/overview', {
    //             applicationId: application.id,
    //         }),
    //         name: 'Overview',
    //     },
    //     {
    //         path: '/documentation/application/:applicationId/container-registry-info',
    //         to: generatePath('/documentation/application/:applicationId/container-registry-info', {
    //             applicationId: application.id,
    //         }),
    //         name: 'Container Registry Info',
    //     },
    //     {
    //         path: '/documentation/application/:applicationId/verify-kubernetes-access',
    //         to: generatePath('/documentation/application/:applicationId/verify-kubernetes-access', {
    //             applicationId: application.id,
    //         }),
    //         name: 'Verify access to kubernetes',
    //     },
    // ];

    // const redirectUrl = generatePath('/documentation/application/:applicationId/overview', {
    //     applicationId: currentApplicationId,
    // });

    return (
        <LayoutWithSidebar navigation={nav}>
            {/* <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} /> */}

            <Routes>
                <Route path='/*' element={<DocumentationContainerScreen application={application} />} />
            </Routes>
        </LayoutWithSidebar>
    );
});
