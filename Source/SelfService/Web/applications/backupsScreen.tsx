// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate, generatePath } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { Box, Grid, List, Typography } from '@mui/material';

import { Button, Building, SimpleCard } from '@dolittle/design-system';

import { useRouteApplicationParams } from '../utils/route';
import { getApplication, HttpResponseApplication } from '../apis/solutions/application';
import { BackupLinkWithName, getLatestBackupLinkByApplication } from '../apis/solutions/backups';

import { ViewCard } from './backup/viewCard';
import { ListView } from './backup/listView';

import { BreadCrumbContainer } from '../components/layout/breadcrumbs';
import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';

const getFullEnvironmentName = (str: string) => {
    if (typeof str !== 'string') return;
    if (str === 'Prod') return 'Production';
    if (str === 'Dev') return 'Development';

    return;
};

const TestBackup = ({ application, backup }: any) => {
    return (
        <Grid key={`${application.name}-${backup.name}`} item>
            <SimpleCard
                title={application.name}
                subtitle={`${getFullEnvironmentName(backup.environment)} - Environment`}
                description={backup.name}
                actionButtons={
                    <>
                        {/* <Button label='View all backups' color='subtle' onClick={() => handleBackupLinkClick(backup)} />
                        <Button label='Download latest Backup' onClick={event => handleBackupDownload(event, backup)} /> */}
                    </>
                }
            />
        </Grid>
    );
};

export const BackupsScreen = () => {
    const navigate = useNavigate();
    const { currentEnvironment, hasOneCustomer, setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();

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

    // TODO: Add sad_aigon if application is not found.
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

    const handleBackupLinkClick = async (backup: BackupLinkWithName) => {
        setCurrentApplicationId(application.id);
        setCurrentEnvironment(backup.environment);

        const href = `/backups/application/${application.id}/${backup.environment}/list`;
        navigate(href);
    };

    const handleBackupDownload = async (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, backup: BackupLinkWithName) => {
        event.stopPropagation();
        const url = await getLatestBackupLinkByApplication(application.id, backup.environment);
        window.open(url.url, '_blank');
    };

    const SimpleCardGrid = () =>
        <Box sx={{ width: 1, maxWidth: 920 }}>
            <Building />
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {backupLinksForEnvironment.map(backup =>
                    <>
                        <Grid key={`${application.name}-${backup.name}`} item>
                            <SimpleCard
                                title={application.name}
                                subtitle={`${getFullEnvironmentName(backup.environment)} - Environment`}
                                description={backup.name}
                                actionButtons={
                                    <>
                                        <Button label='View all backups' color='subtle' onClick={() => handleBackupLinkClick(backup)} />
                                        <Button label='Download latest Backup' onClick={event => handleBackupDownload(event, backup)} />
                                    </>
                                }
                            />
                        </Grid>

                        <TestBackup application={application} backup={backup} />
                    </>
                )}

                <List>
                    {environments.map(environment => (
                        <li key={environment.name}>
                            <ViewCard application={application} environment={environment.name} />
                        </li>
                    ))}
                </List>
            </Grid>
        </Box>;

    return (
        <LayoutWithSidebar navigation={nav}>
            <BreadCrumbContainer routes={routes} />
            <Routes>
                <Route path="/overview" element={<SimpleCardGrid />} />
                <Route path="/:environment/list" element={<ListView application={application} environment={currentEnvironment} />} />
                <Route element={<Typography variant='h1' my={2}>Something has gone wrong: backups.</Typography>} />
            </Routes>
        </LayoutWithSidebar>
    );
};
