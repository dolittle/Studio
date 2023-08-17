// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, useNavigate, Routes } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { Typography } from '@mui/material';

import { getApplication, getApplicationsListing, HttpResponseApplication } from '../apis/solutions/application';

import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';
import { RegistryContainer } from './containerregistry/registryContainer';
import { RouteNotFound } from '../components/notfound';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

export const ContainerRegistryScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const { hasOneCustomer } = useGlobalContext();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentApplicationId = routeApplicationParams.applicationId;

    useEffect(() => {
        if (!currentApplicationId) return;

        Promise.all([
            getApplicationsListing(),
            getApplication(currentApplicationId),
        ]).then(values => {
            const applicationData = values[1];

            if (!applicationData?.id) {
                const href = `/problem`;
                navigate(href);
                return;
            }

            setApplication(applicationData);
            setIsLoaded(true);
        }).catch(error => console.log(error));
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application not found</Typography>;
    }

    const nav = getMenuWithApplication(navigate, application, hasOneCustomer);

    //const routes = [];

    return (
        <LayoutWithSidebar navigation={nav}>
            <Routes>
                <Route path='/overview/*' element={<RegistryContainer application={application} />} />
                <Route path='*' element={<RouteNotFound redirectUrl={'overview'} auto={true} />} />
            </Routes>
        </LayoutWithSidebar>
    );
});
