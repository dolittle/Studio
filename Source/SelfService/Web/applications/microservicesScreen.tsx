// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { mergeMicroservicesFromGit, mergeMicroservicesFromK8s } from './stores/microservice';

import { getMicroservices } from '../apis/solutions/api';
import { getApplication, HttpResponseApplication } from '../apis/solutions/application';

import { WorkSpaceLayoutWithSidePanel } from '../components/layout/workSpaceLayout';
import { Microservice } from './microservice/microservices/microservices';
import { MicroserviceNewScreen } from './microservice/microserviceNewScreen';
import { MicroserviceViewScreen } from './microservice/microserviceViewScreen';
import { RouteNotFound } from '../components/notfound';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

export const MicroservicesScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentApplicationId = routeApplicationParams.applicationId;

    useEffect(() => {
        if (!currentApplicationId) {
            enqueueSnackbar('No application found with this ID.', { variant: 'error' });
            navigate('/applications');
            return;
        };

        Promise.all([
            getApplication(currentApplicationId),
            getMicroservices(currentApplicationId),
        ]).then(values => {
            const applicationData = values[0];

            if (!applicationData.id) {
                navigate('/problem');
                return;
            }

            setApplication(applicationData);

            mergeMicroservicesFromGit(applicationData.microservices);
            mergeMicroservicesFromK8s(values[1].microservices);

            setIsLoaded(true);
        }).catch(() => {
            enqueueSnackbar('Failed getting data from the server.', { variant: 'error' });
            navigate('/applications');
            return;
        });
    }, []);

    if (!isLoaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application not found.</Typography>;
    }

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='Microservices | Applications' sidePanelMode='applications'>
            <Routes>
                <Route path='/overview' element={<Microservice application={application} />} />
                <Route path='/create' element={<MicroserviceNewScreen application={application} />} />
                <Route path='view/:microserviceId/:environment' element={<MicroserviceViewScreen application={application} />} />
                <Route path='*' element={<RouteNotFound redirectUrl={'overview'} auto={true} />} />
            </Routes>
        </WorkSpaceLayoutWithSidePanel>
    );
});
