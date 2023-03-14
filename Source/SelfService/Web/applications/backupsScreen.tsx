// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate, generatePath } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { List, Typography } from '@mui/material';

import { useRouteApplicationParams } from '../utils/route';
import { getApplication, HttpResponseApplication } from '../apis/solutions/application';

import { ViewCard } from './backup/viewCard';
import { ListView } from './backup/listView';
import { BreadCrumbContainer } from '../components/layout/breadcrumbs';
import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';

export const BackupsScreen = () => {
    const navigate = useNavigate();
    const { currentEnvironment, hasOneCustomer } = useGlobalContext();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [loaded, setLoaded] = useState(false);

    const routeApplicationProps = useRouteApplicationParams();
    const applicationId = routeApplicationProps.applicationId;

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

    if (!loaded) return null;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application with this environment not found</Typography>;
    }

    const environments = application.environments;

    const nav = getMenuWithApplication(navigate, application, currentEnvironment, hasOneCustomer);

    const routes = [
        {
            path: '/backups/application/:applicationId',
            to: generatePath('/backups/application/:applicationId/overview', {
                applicationId: application.id,
            }),
            name: 'Backups',
        },
        {
            path: '/backups/application/:applicationId/overview',
            to: generatePath('/backups/application/:applicationId/overview', {
                applicationId: application.id,
            }),
            name: 'Overview',
        },
        {
            path: '/backups/application/:applicationId/:environment/list',
            to: generatePath('/backups/application/:applicationId/:environment/list', {
                applicationId: application.id,
                environment: currentEnvironment,
            }),
            name: currentEnvironment,
        },
    ];

    return (
        <LayoutWithSidebar navigation={nav}>
            <div id="topNavBar" className="nav flex-container">
                <div className="left flex-start">
                    <BreadCrumbContainer routes={routes} />
                </div>
            </div>
            <Routes>
                <Route path="/overview" element={
                    <div className="serv">
                        <List>
                            {environments.map(environment => (
                                <li key={environment.name}>
                                    <ViewCard application={application} environment={environment.name} />
                                </li>
                            ))}
                        </List>
                    </div>
                } />

                <Route path="/:environment/list" element={<ListView application={application} environment={currentEnvironment} />} />
                <Route element={<Typography variant='h1' my={2}>Something has gone wrong: backups</Typography>} />
            </Routes>
        </LayoutWithSidebar>
    );
};
