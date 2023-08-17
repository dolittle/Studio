// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { generatePath, Route, Routes, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { Typography } from '@mui/material';

import { LoadingSpinner } from '@dolittle/design-system';

import { useRouteApplicationParams } from '../utils/route';
import { getApplication, HttpResponseApplication } from '../apis/solutions/application';
import { BackupLinkWithName, getLatestBackupLinkByApplication } from '../apis/solutions/backups';

import { BreadCrumbContainer } from '../components/layout/breadcrumbs';
import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';
import { BackupsList } from './backup/backupsList';
import { BackupsListView } from './backup/backupsListView';

export const BackupsScreen = () => {
    const navigate = useNavigate();
    const { currentEnvironment, hasOneCustomer } = useGlobalContext();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [backupLinksForEnvironment, setBackupLinksForEnvironment] = useState<BackupLinkWithName[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const routeApplicationProps = useRouteApplicationParams();
    const applicationId = routeApplicationProps.applicationId;
    const environments = application.environments;

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
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!environments) return;

        Promise.all(environments.map(environment =>
            getLatestBackupLinkByApplication(application.id, environment.name)))
            .then(values => setBackupLinksForEnvironment(values));
    }, [environments]);

    if (isLoading) return <LoadingSpinner />;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application with this environment not found.</Typography>;
    }

    const nav = getMenuWithApplication(navigate, application, hasOneCustomer);

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
            path: '/backups/application/:applicationId/list',
            to: generatePath('/backups/application/:applicationId/list', {
                applicationId: application.id,
            }),
            name: application.name,
        },
    ];

    return (
        <LayoutWithSidebar navigation={nav}>
            <BreadCrumbContainer routes={routes} />
            <Routes>
                <Route path='overview' element={<BackupsList data={backupLinksForEnvironment} application={application} />} />
                <Route path='list' element={<BackupsListView application={application} environment={currentEnvironment} />} />
                <Route element={<Typography variant='h1' my={2}>Something has gone wrong: backups.</Typography>} />
            </Routes>
        </LayoutWithSidebar>
    );
};
