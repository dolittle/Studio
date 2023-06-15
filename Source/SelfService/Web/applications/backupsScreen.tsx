// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate, generatePath } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { Box, Grid, Typography } from '@mui/material';

import { Button, Building, SimpleCard } from '@dolittle/design-system';

import { useRouteApplicationParams } from '../utils/route';
import { getApplication, HttpResponseApplication } from '../apis/solutions/application';
import { BackupLinkWithName, getLatestBackupLinkByApplication } from '../apis/solutions/backups';

import { ListView } from './backup/listView';

import { BreadCrumbContainer } from '../components/layout/breadcrumbs';
import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';

type BackupsCardGridProps = {
    data: BackupLinkWithName[];
    application: HttpResponseApplication;
};

const BackupsCardGrid = ({ data, application }: BackupsCardGridProps) => {
    return (
        <Box sx={{ width: 1, maxWidth: 950 }}>
            <Building />
            <Grid container spacing={4} sx={{ mt: 4, maxWidth: 950 }}>
                {data.map(file =>
                    <Grid key={`${application.name}-${file.name}`} item>
                        <BackupsCardGridItem  {...file} application={application} />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

type BackupsCardGridItemProps = {
    application: HttpResponseApplication;
    environment: string;
    url: string;
};

const BackupsCardGridItem = ({ application, environment, url }: BackupsCardGridItemProps) => {
    const navigate = useNavigate();
    const { setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();

    const getFullEnvironmentName = (str: string) => {
        if (str === 'Prod') return 'Production';
        if (str === 'Dev') return 'Development';

        return 'N/A';
    };

    const handleBackupsView = async () => {
        setCurrentApplicationId(application.id);
        setCurrentEnvironment(environment);

        const href = `/backups/application/${application.id}/${environment}/list`;
        navigate(href);
    };

    const handleBackupDownload = async (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
        event.stopPropagation();
        const url = await getLatestBackupLinkByApplication(application.id, environment);
        window.open(url.url, '_blank');
    };

    return (
        <SimpleCard
            title={application.name}
            subtitle={`${getFullEnvironmentName(environment)} - Environment`}
            description={url}
            actionButtons={
                <>
                    <Button label='View all backups' color='subtle' onClick={handleBackupsView} />
                    <Button label='Download latest Backup' onClick={handleBackupDownload} />
                </>
            }
        />
    );
};

export const BackupsScreen = () => {
    const navigate = useNavigate();
    const { currentEnvironment, hasOneCustomer } = useGlobalContext();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [backupLinksForEnvironment, setBackupLinksForEnvironment] = useState<BackupLinkWithName[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const routeApplicationProps = useRouteApplicationParams();
    const applicationId = routeApplicationProps.applicationId;
    const environments = application.environments;

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
            setIsLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (!environments) return;
        Promise.all(environments.map(environment =>
            getLatestBackupLinkByApplication(application.id, environment.name)))
            .then(values => setBackupLinksForEnvironment(values));
    }, [environments]);

    if (!isLoaded) return null;

    // TODO: Add sad_aigon_svg and back button if application is not found.
    if (application.id === '') {
        return <Typography variant='h1' my={2}>Application with this environment not found.</Typography>;
    }

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
            <BreadCrumbContainer routes={routes} />
            <Routes>
                <Route path="/overview" element={<BackupsCardGrid data={backupLinksForEnvironment} application={application} />} />
                <Route path="/:environment/list" element={<ListView application={application} environment={currentEnvironment} />} />
                <Route element={<Typography variant='h1' my={2}>Something has gone wrong: backups.</Typography>} />
            </Routes>
        </LayoutWithSidebar>
    );
};
