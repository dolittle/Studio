// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { generatePath, Route, useNavigate, Routes } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { HttpResponseApplication, getApplicationsListing, getApplication } from '../apis/solutions/application';

import { WorkSpaceLayoutWithSidePanel } from '../components/layout/workSpaceLayout';
import { SetupContainerScreen } from './setup/setupContainerScreen';

import { withRouteApplicationState } from '../spaces/applications/withRouteApplicationState';

export const DocumentationScreen = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const currentApplicationId = routeApplicationParams.applicationId;

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!currentApplicationId) return;

        Promise.all([
            getApplicationsListing(),
            getApplication(currentApplicationId),
        ]).then(values => {
            const applicationData = values[1];

            if (!applicationData.id) {
                navigate('/problem');
                return;
            }

            setApplication(applicationData);
            setIsLoaded(true);
        }).catch(() => {
            enqueueSnackbar('Failed getting data from the server.', { variant: 'error' });
        });
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application not found.</Typography>;
    }

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

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='Setup' sidePanelMode='applications'>
            <Routes>
                <Route path='/*' element={<SetupContainerScreen application={application} />} />
            </Routes>
        </WorkSpaceLayoutWithSidePanel>
    );
});
