// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import {
    Route,
    useNavigate,
    Routes,
    generatePath
} from 'react-router-dom';

import { ShortInfoWithEnvironment } from '../api/solutions/api';
import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';


import { RouteNotFound } from '../components/notfound';
import { PickEnvironment, isEnvironmentValidFromUri } from '../components/pickEnvironment';
import { TopNavBar } from '../components/layout/topNavBar';
import {
    HttpResponseApplication,
    getApplications,
    getApplication,
    HttpResponseApplications,
} from '../api/solutions/application';
import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';
import { ContainerRegistryContainer } from './containerregistry/container';
import { Typography } from '@mui/material';



export const ContainerRegistryScreen: React.FunctionComponent = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const currentEnvironment = routeApplicationParams.environment;
    const currentApplicationId = routeApplicationParams.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [applications, setApplications] = useState([] as ShortInfoWithEnvironment[]);
    const [loaded, setLoaded] = useState(false);

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
                const href = `/problem`;
                navigate(href);
                return;
            }

            // TODO this should be unique
            // TODO also when we have more than one application and more than one environment we should default to something.
            setApplications(applicationsData.applications);
            setApplication(applicationData);
            setLoaded(true);
        }).catch((error) => {
            console.log(error);
        });
    }, [currentApplicationId, currentEnvironment]);

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
                redirectTo={'/documentation/application/:applicationId/:environment/overview'}
                openModal={true} />
        );
    }

    const nav = getMenuWithApplication(navigate, application, currentEnvironment);

    const routes = [];

    return (
        <LayoutWithSidebar navigation={nav}>
            <TopNavBar routes={routes} applications={applications} applicationId={currentApplicationId} environment={currentEnvironment} />

            <Routes>
                <Route
                    path="/overview/*"
                    element={<ContainerRegistryContainer application={application} environment={currentEnvironment} />} />

                <Route path='*' element={<RouteNotFound redirectUrl={'overview'} auto={true} />} />

            </Routes>
        </LayoutWithSidebar >
    );
});
