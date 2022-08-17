// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { useReadable } from 'use-svelte-store';

import { microservices, MicroserviceStore, canDeleteMicroservice, canEditMicroservice } from '../../stores/microservice';
import { Configuration } from './configuration';
import { HttpResponsePodStatus } from '../../api/api';
import { MicroserviceSimple } from '../../api/index';
import { HttpResponseApplication } from '../../api/application';

import { Tab, Tabs } from '../../theme/tabs';
import { Grid, IconButton, Typography } from '@mui/material';
import { TabPanel } from '../../utils/materialUi';
import DeleteIcon from '@mui/icons-material/Delete';

import { HealthStatus } from '../healthStatus/healthStatus';

const styles = {
    deleteIcon: {
        'padding': 0,
        'marginRight': 1,
        'fill': 'white',
        '& .MuiSvgIcon-root': {
            color: 'white',
            marginRight: 1,
        },
        '& .MuiTypography-root': {
            color: 'white',
            textTransform: 'uppercase'
        }
    }
};

type ViewProps = {
    application: HttpResponseApplication
    environment: string
    microserviceId: string
    podsData: HttpResponsePodStatus
};

export const View = ({ application, microserviceId, environment, podsData }: ViewProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();

    const applicationId = application.id;

    const currentMicroservice: MicroserviceStore = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/microservices/application/${application.id}/${environment}/overview`;
        history.push(href);
        return null;
    }

    const canDelete = canDeleteMicroservice(application.environments, environment, currentMicroservice.id);
    const canEdit = canEditMicroservice(application.environments, environment, currentMicroservice.id);

    let ms = {} as MicroserviceSimple;
    let hasEditData = false;
    if (canEdit) {
        hasEditData = true;
        ms = currentMicroservice.edit;
    }

    if (!hasEditData) {
        // Can I not move this to the store?
        const headImage = currentMicroservice.live.images.find(img => img.name === 'head')?.image
            || 'n/a';
        const runtimeImage = currentMicroservice.live.images.find(img => img.name === 'runtime')?.image
            || 'n/a';

        const headCommand = {
            command: [],
            args: []
        };

        const environmentInfo = application.environments.find(_environment => _environment.name === environment)!;
        // TODO currently we don't use the ms.extra.ingress in the view
        // Look to "liveIngressView" for how we "set" the data to uniq paths
        ms = {
            dolittle: {
                applicationId,
                customerId: application.customerId,
                microserviceId,
            },
            name: currentMicroservice.name,
            kind: 'unknown',
            environment: environment,
            extra: {
                ingress: {
                    path: '',
                    pathType: ''
                },
                headPort: 80,
                isPublic: true,
                headImage,
                runtimeImage,
                headCommand,
                connections: environmentInfo.connections,
            },
        };
    }

    const msName = currentMicroservice.name;

    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleDelete = () => {
        if (!canDelete) {
            enqueueSnackbar('Deleting microservice is disabled', { variant: 'error' });
            return;
        }

        const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/delete`;
        history.push(href);
    };

    return (
        <Grid
            container
            direction='column'
            justifyContent='flex-start'
        >
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={3}>
                    <Typography variant="h3">{msName}</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={3}>

                <Grid item xs={10}>
                    <Tabs value={currentTab} onChange={handleChange}>
                        <Tab label='Health Status' />
                        <Tab label='Configuration' />
                    </Tabs>
                </Grid>

                <Grid item xs={2}>
                    <Grid
                        container
                        direction='row'
                        justifyContent='space-around'
                        alignItems='flex-end'
                    >
                        <IconButton
                            onClick={handleDelete}
                            sx={styles.deleteIcon}
                            size="large">
                            <DeleteIcon />
                            <Typography>delete</Typography>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <TabPanel value={currentTab} index={0}>
                <HealthStatus applicationId={applicationId} status="TODO" environment={environment} microserviceId={microserviceId} data={podsData} />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
                <Configuration
                    applicationId={applicationId}
                    environment={environment}
                    microserviceId={microserviceId}
                    msName={msName}
                    ingressUrls={currentMicroservice.live.ingressUrls}
                    ingressPaths={currentMicroservice.live.ingressPaths}
                    ms={ms}
                    onClick={async () => {
                        const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/environment-variables`;
                        history.push(href);
                    }}
                />
            </TabPanel>
        </Grid >
    );
};
