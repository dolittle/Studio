// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { useReadable } from 'use-svelte-store';

import { DataStateIcon } from './dataStateIcon';
import { Grid, IconButton, Typography, Divider, Box, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Tabs } from '@dolittle/design-system/atoms/Tabs/Tabs';

import { microservices, MicroserviceStore, savePurchaseOrderMicroservice } from '../../stores/microservice';
import { MicroservicePurchaseOrder } from '../../api/index';
import { HttpResponsePodStatus } from '../../api/api';
import { ViewConfiguration } from './viewConfiguration';

import { DownloadButtons } from '../components/downloadButtons';
import { HealthStatus } from '../microserviceView/healthStatus/healthStatus';

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
    podsData: HttpResponsePodStatus
};

const classes = {
    editIcon: {
        'p': 0,
        'mr': 1,
        'fill': 'primary.dark',
        '& .MuiSvgIcon-root': {
            color: 'primary.dark',
            mr: 1,
        },
        '& .MuiTypography-root': {
            color: 'primary.dark',
            textTransform: 'uppercase'
        }
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        p: 2,
        textAlign: 'center',
    },
    divider: {
        backgroundColor: '#3B3D48'
    }
};

export const View = (props: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();
    const location = useLocation();

    const _props = props!;
    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;
    const podsData = _props.podsData;

    const currentMicroservice: MicroserviceStore = $microservices.find(ms => ms.id === microserviceId && ms.environment === environment);
    if (!currentMicroservice) {
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }

    // TODO modify when we know how we want to handle state of purchase order data
    // Fake it till we are ready
    const msName = currentMicroservice.name;
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const firstTime = searchParams.get('firstTime')!;
        if (firstTime === '1') {
            enqueueSnackbar('Microservice ‘Supplier PO API’ successfully created.');
        }
    }, []);

    const [editMode, setEditMode] = useState(false);

    const getFakeState = (searchParams: URLSearchParams): string => {
        if (!searchParams.has('dataState')) {
            return 'waiting';
        }
        return searchParams.get('dataState') as string;
    };

    const fakeState = getFakeState(searchParams);

    const _onSave = (ms: MicroservicePurchaseOrder): void => {
        enqueueSnackbar('TODO: Update not done', { variant: 'error' });
        return;
        // TODO handle exception (maybe move to wait)
        savePurchaseOrderMicroservice(ms).then((data) => {
            // TODO We want to take them to the actual new microservice and set to step 3.
            //const href = `/microservices/application/${application.id}/${environment}/overview`;
            const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}?step=3`;
            history.push(href);
        }).catch(reason => console.log(reason));
    };

    return (
        <Grid container direction='column' justifyContent='flex-start'>

            <Grid container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={3}>
                    <Typography variant="h3">{msName}</Typography>
                </Grid>

                <Grid item xs={3}>
                    <DataStateIcon state={fakeState} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Grid
                        container
                        direction='row'
                        justifyContent='space-around'
                        alignItems='flex-end'
                    >
                        <IconButton
                            onClick={() => {
                                setEditMode(!editMode);
                            }}
                            sx={classes.editIcon}
                            size="large">
                            <EditIcon />
                            <Typography>Edit</Typography>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Tabs
                tabs={[
                    {
                        label: 'Configuration',
                        render: () => <>
                            <Box ml={2}>
                                <ViewConfiguration onSave={_onSave} microservice={currentMicroservice.edit} editMode={editMode} onCancel={() => {
                                    setEditMode(false);
                                }} />
                            </Box>

                            <Divider sx={classes.divider} />

                            <Box ml={2}>
                                <DownloadButtons
                                    environment={environment}
                                    microserviceName={currentMicroservice.name}
                                    applicationId={applicationId}
                                />
                            </Box>
                        </>
                    },
                    {
                        label: 'Health Status',
                        render: () => <HealthStatus applicationId={applicationId} status="TODO" environment={environment} microserviceId={microserviceId} data={podsData} />
                    }
                ]} />
        </Grid>
    );
};
