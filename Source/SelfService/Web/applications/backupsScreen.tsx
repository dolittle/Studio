// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Route, Routes, useNavigate, generatePath } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

import { Box, Grid, List, Typography } from '@mui/material';

import { Button, Building, SimpleCard } from '@dolittle/design-system';

import { useRouteApplicationParams } from '../utils/route';
import { getApplication, HttpResponseApplication } from '../apis/solutions/application';
import { getLatestBackupLinkByApplication } from '../apis/solutions/backups';

import { ViewCard } from './backup/viewCard';
import { ListView } from './backup/listView';

import { BreadCrumbContainer } from '../components/layout/breadcrumbs';
import { getMenuWithApplication, LayoutWithSidebar } from '../components/layout/layoutWithSidebar';

// const dummy = [
//     {
//         name: 'Dev',
//     },
//     {
//         name: 'Prod',
//     },
//     {
//         name: 'Dev',
//     },
//     {
//         name: 'Prod',
//     },
// ];

type SimpleCardGridProps = {
    data: any[];
    applicationName: string;
};

export const BackupsScreen = () => {
    const navigate = useNavigate();
    const { currentEnvironment, hasOneCustomer, setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();

    const [application, setApplication] = useState({} as HttpResponseApplication);
    const [backupLinksForEnvironment, setBackupLinksForEnvironment] = useState<any[]>([]);
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
            .then(values => {
                setBackupLinksForEnvironment(values);
            });
    }, [environments]);

    if (!isLoaded) return null;

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

    const SimpleCardGrid = ({ data, applicationName }: SimpleCardGridProps) =>
        <Box sx={{ maxWidth: 920 }}>
            <Building />
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {data.map(environment =>
                    <Grid key={`${applicationName}-${environment.name}`} item xs={12} md={6}>
                        <SimpleCard
                            title={applicationName}
                            subtitle={`${environment.name} - Environment`}//TODO: Fix this
                            description={environment.name}
                            actionButtons={
                                <>
                                    <Button
                                        label='View all backups'
                                        color='subtle'
                                        onClick={() => {
                                            setCurrentApplicationId(application.id);
                                            setCurrentEnvironment(environment);

                                            const href = `/backups/application/${application.id}/${environment}/list`;
                                            navigate(href);
                                        }}
                                    />
                                    <Button
                                        label='Download latest Backup'
                                        onClick={async (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): Promise<void> => {
                                            event.stopPropagation();

                                            const url = await getLatestBackupLinkByApplication(application.id, environment);
                                            window.open(url.url, '_blank');
                                        }}
                                    />
                                </>
                            }
                        />
                    </Grid>
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
                <Route path="/overview" element={<SimpleCardGrid data={backupLinksForEnvironment} applicationName={application.name} />} />
                <Route path="/:environment/list" element={<ListView application={application} environment={currentEnvironment} />} />
                <Route element={<Typography variant='h1' my={2}>Something has gone wrong: backups.</Typography>} />
            </Routes>
        </LayoutWithSidebar>
    );
};
