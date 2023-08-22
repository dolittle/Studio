// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { HttpResponseApplication, getApplication } from '../apis/solutions/application';

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

        Promise.all([getApplication(currentApplicationId)])
            .then(values => {
                if (!values[0].id) {
                    navigate('/problem');
                    return;
                }

                setApplication(values[0]);
                setIsLoaded(true);
            }).catch(() => {
                enqueueSnackbar('Failed getting data from the server.', { variant: 'error' });
            });
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' sx={{ my: 2 }}>Application not found.</Typography>;
    }

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='Setup' sidePanelMode='applications'>
            <Routes>
                <Route path='/*' element={<SetupContainerScreen application={application} />} />
            </Routes>
        </WorkSpaceLayoutWithSidePanel>
    );
});
