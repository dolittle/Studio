// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { Typography } from '@mui/material';

import { getApplication, HttpResponseApplication } from '../apis/solutions/application';
import { useRouteApplicationParams } from '../utils/route';
import { Container } from './m3connector/container';

import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';
//import { BreadCrumbContainer } from '../components/layout/breadcrumbs';

export const M3ConnectorScreen = () => {
    const navigate = useNavigate();
    const routeApplicationProps = useRouteApplicationParams();
    const { hasOneCustomer } = useGlobalContext();

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

    const nav = getMenuWithApplication(navigate, application, hasOneCustomer);

    //const routes = [];

    return (
        <LayoutWithSidebar navigation={nav}>
            {/* <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer routes={routes} />
                </div>
            </div> */}

            <Routes>
                <Route path='/*' element={<Container application={application} />} />
            </Routes>
        </LayoutWithSidebar>
    );
};
