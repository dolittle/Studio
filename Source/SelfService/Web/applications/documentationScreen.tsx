// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, useNavigate, Routes, generatePath } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

// I wonder if scss is scoped like svelte. I hope so!
// Not scoped like svelte
import '../spaces/applications/applicationScreen.scss';

import { ShortInfoWithEnvironment } from '../apis/solutions/api';
import { HttpResponseApplication, getApplications, getApplication, HttpResponseApplications } from '../apis/solutions/application';

import { TopNavBar } from '../components/layout/topNavBar';
import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';
import { DocumentationContainerScreen } from './documentation/container';
import { PickEnvironment, isEnvironmentValidFromUrl } from '../components/pickEnvironment';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

export const DocumentationScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const { hasOneCustomer } = useGlobalContext();
    const navigate = useNavigate();

    const currentEnvironment = routeApplicationParams.environment;
    const currentApplicationId = routeApplicationParams.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState([] as ShortInfoWithEnvironment[]);
    const [isLoaded, setIsLoaded] = useState(false);

    const href = `/problem`;

    useEffect(() => {
        if (!currentEnvironment || !currentApplicationId) {
            return;
        }

        Promise.all([
            getApplications(),
            getApplication(currentApplicationId),
        ]).then(values => {
            const applicationsData = values[0] as HttpResponseApplications;
            const applicationData = values[1];

            if (!applicationData?.id) {
                navigate(href);
                return;
            }

            // TODO this should be unique
            // TODO also when we have more than one application and more than one environment we should default to something.
            setApplications(applicationsData.applications);
            setApplication(applicationData);
            setIsLoaded(true);
        }).catch(() => {
            navigate(href);
            return;
        });
    }, [currentApplicationId, currentEnvironment]);

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
                redirectTo={'/documentation/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getMenuWithApplication(navigate, application, hasOneCustomer);

    const routes = [
        {
            path: '/documentation/application/:applicationId/:environment',
            to: generatePath('/documentation/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Documentation',
        },
        {
            path: '/documentation/application/:applicationId/:environment/overview',
            to: generatePath('/documentation/application/:applicationId/:environment/overview', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Overview',
        },
        {
            path: '/documentation/application/:applicationId/:environment/container-registry-info',
            to: generatePath('/documentation/application/:applicationId/:environment/container-registry-info', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Container Registry Info',
        },
        {
            path: '/documentation/application/:applicationId/:environment/verify-kubernetes-access',
            to: generatePath('/documentation/application/:applicationId/:environment/verify-kubernetes-access', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: 'Verify access to kubernetes',
        },
    ];

    // const redirectUrl = generatePath('/documentation/application/:applicationId/:environment/overview', {
    //     applicationId: currentApplicationId,
    //     environment: currentEnvironment,
    // });

    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />

            <Routes>
                <Route path='/*' element={<DocumentationContainerScreen application={application} environment={currentEnvironment} />} />
            </Routes>
        </LayoutWithSidebar>
    );
});
