// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { getApplication, HttpResponseApplication } from '../../apis/solutions/application';

import { WorkSpaceLayoutWithSidePanel } from '../../layout/workSpaceLayout';
import { ContainerIndex } from './container';
import { RouteNotFound } from '../../components/notfound';

import { withRouteApplicationState } from '../../utils/withRouteApplicationState';

export const ContainerRegistryIndex = withRouteApplicationState(({ routeApplicationParams }) => {
    const navigate = useNavigate();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    const currentApplicationId = routeApplicationParams.applicationId;

    useEffect(() => {
        if (!currentApplicationId) return;

        Promise.all([getApplication(currentApplicationId)])
            .then(values => {
                const applicationData = values[0];

                if (!applicationData?.id) {
                    const href = `/problem`;
                    navigate(href);
                    return;
                }

                setApplication(applicationData);
                setIsLoaded(true);
            })
            .catch(error => console.log(error));
    }, [currentApplicationId]);

    if (!isLoaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' sx={{ m: 2 }}>Application not found.</Typography>;
    }

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='Container Registry | Applications' sidePanelMode='applications'>
            <Routes>
                <Route path='/overview/*' element={<ContainerIndex application={application} />} />
                <Route path='*' element={<RouteNotFound redirectUrl={'overview'} auto={true} />} />
            </Routes>
        </WorkSpaceLayoutWithSidePanel>
    );
});
