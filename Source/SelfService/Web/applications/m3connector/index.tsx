// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { getApplication, HttpResponseApplication } from '../../apis/solutions/application';

import { WorkSpaceLayoutWithSidePanel } from '../../components/layout/workSpaceLayout';
import { Overview } from './overview';
import { DetailsView } from './DetailsView';
import { SetupView } from './SetupView';

import { useRouteApplicationParams } from '../../utils/route';

export const M3ConnectorIndex = () => {
    const navigate = useNavigate();
    const routeApplicationProps = useRouteApplicationParams();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    const applicationId = routeApplicationProps.applicationId;

    useEffect(() => {
        Promise.all([getApplication(applicationId)])
            .then(values => {
                const applicationData = values[0];

                if (!applicationData?.id) {
                    const href = `/problem`;
                    navigate(href);
                    return;
                }

                setApplication(applicationData);
                setIsLoaded(true);
            });
    }, []);

    if (!isLoaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application  not found.</Typography>;
    }

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='M3 Connector | Applications' sidePanelMode='applications'>
            <Typography variant='h1' my={2}>M3 Connector</Typography>
            <Routes>
                <Route path='/overview' element={<Overview application={application} />} />
                <Route path='/:environment/setup' element={<SetupView application={application} />} />
                <Route path='/:environment/details' element={<DetailsView applicationId={application.id} />} />
            </Routes>
        </WorkSpaceLayoutWithSidePanel>
    );
};
