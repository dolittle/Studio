// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';

import { Typography } from '@mui/material';

import { LoadingSpinner } from '@dolittle/design-system';

import { useRouteApplicationParams } from '../../utils/route';
import { getApplication, HttpResponseApplication } from '../../apis/solutions/application';
import { BackupLinkWithName, getLatestBackupLinkByApplication } from '../../apis/solutions/backups';

import { WorkSpaceLayoutWithSidePanel } from '../../layout/workSpaceLayout';
import { BackupsList } from './backupsList/backupsList';
import { BackupsDetailView } from './backupsDetail/BackupsDetailView';

export const BackupsIndex = () => {
    const navigate = useNavigate();
    const { currentEnvironment } = useGlobalContext();

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
            .then(setBackupLinksForEnvironment);
    }, [environments]);

    if (isLoading) return <LoadingSpinner />;

    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application not found.</Typography>;
    }

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='Backups | Applications' sidePanelMode='applications'>
            <Routes>
                <Route path='overview' element={<BackupsList data={backupLinksForEnvironment} application={application} />} />
                <Route path='list' element={<BackupsDetailView application={application} environment={currentEnvironment} />} />
                <Route element={<Typography variant='h1' my={2}>Something has gone wrong: backups.</Typography>} />
            </Routes>
        </WorkSpaceLayoutWithSidePanel>
    );
};
