// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../context/globalContext';

import { Typography } from '@mui/material';

import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from './stores/microservice';

import { getMicroservices } from '../apis/solutions/api';
import { getApplicationsListing, getApplication, HttpResponseApplication } from '../apis/solutions/application';

import { Microservice } from './microservice/microservices/microservices';
import { MicroserviceNewScreen } from './microservice/microserviceNewScreen';
import { MicroserviceViewScreen } from './microservice/microserviceViewScreen';
import { LayoutWithSidebar, getMenuWithApplication } from '../components/layout/layoutWithSidebar';
import { RouteNotFound } from '../components/notfound';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

export const MicroservicesScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { hasOneCustomer } = useGlobalContext();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentApplicationId = routeApplicationParams.applicationId;

    useEffect(() => {
        if (!currentApplicationId) return;

        Promise.all([
            getApplicationsListing(),
            getApplication(currentApplicationId),
            getMicroservices(currentApplicationId),
        ]).then(values => {
            const applicationData = values[1];

            if (!applicationData.id) {
                navigate('/problem');
                return;
            }

            setApplication(applicationData);

            mergeMicroservicesFromGit(applicationData.microservices);
            mergeMicroservicesFromK8s(values[2].microservices);

            setIsLoaded(true);
        }).catch(() => {
            enqueueSnackbar('Failed getting data from the server', { variant: 'error' });
        });
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application not found</Typography>;
    }

    const nav = getMenuWithApplication(navigate, application, hasOneCustomer);

    return (
        <LayoutWithSidebar navigation={nav}>
            <Routes>
                <Route path='/overview' element={<Microservice application={application} />} />
                <Route path='/create' element={<MicroserviceNewScreen application={application} />} />
                <Route path='view/:microserviceId' element={<MicroserviceViewScreen application={application} />} />
                <Route path='*' element={<RouteNotFound redirectUrl={'overview'} auto={true} />} />
            </Routes>
        </LayoutWithSidebar>
    );
});
