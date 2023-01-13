// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import {
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom';

import { getApplication, HttpResponseApplication } from '../api/application';
import { getMenuWithApplication, LayoutWithSidebar } from '../layout/layoutWithSidebar';
import { BreadCrumbContainer } from '../layout/breadcrumbs';
import { useRouteApplicationParams } from '../utils/route';
import { useGlobalContext } from '../stores/notifications';

import { Container } from '../m3connector/container';
import { Typography } from '@mui/material';

type Props = {
    application?: HttpResponseApplication
};

export const M3ConnectorScreen: React.FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const { currentEnvironment } = useGlobalContext();

    const routeApplicationProps = useRouteApplicationParams();
    const applicationId = routeApplicationProps.applicationId;
    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getApplication(applicationId),
        ]).then(values => {
            const applicationData = values[0];
            if (!applicationData?.id) {
                const href = `/problem`;
                navigate(href);
                return;
            }

            setApplication(applicationData);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }

    if (application.id === '') {
        return (
            <>
                <Typography variant='h1' my={2}>Application  not found</Typography>
            </>
        );
    }

    const nav = getMenuWithApplication(navigate, application, currentEnvironment);

    const routes = [];

    return (
        <>
            <LayoutWithSidebar navigation={nav}>
                <div id="topNavBar" className="nav flex-container">
                    <div className="left flex-start">
                        <BreadCrumbContainer routes={routes} />
                    </div>
                </div>
                <Routes>
                    <Route
                        path="*"
                        element={<Container application={application} />} />
                </Routes>
            </LayoutWithSidebar>
        </>
    );
};
