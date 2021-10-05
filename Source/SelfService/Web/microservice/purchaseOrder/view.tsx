// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    Grid,
    IconButton,
    Typography,
    Tabs,
    Tab
} from '@material-ui/core';
import { TabPanel } from '../../utils/materialUi';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { microservices, savePurchaseOrderMicroservice } from '../../stores/microservice';
import { MicroservicePurchaseOrder } from '../../api/index';
import { HttpResponsePodStatus } from '../../api/api';
import { HealthStatus } from '../view/healthStatus';
import { useReadable } from 'use-svelte-store';
import { ViewConfiguration } from './viewConfiguration';
import { DataStateIcon } from './dataStateIcon';

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
    podsData: HttpResponsePodStatus
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        deleteIcon: {
            'padding': 0,
            'marginRight': theme.spacing(1),
            'fill': 'white',
            '& .MuiSvgIcon-root': {
                color: 'white',
                marginRight: theme.spacing(1),
            },
            '& .MuiTypography-root': {
                color: 'white',
                textTransform: 'uppercase'
            }
        },
        editIcon: {
            'padding': 0,
            'marginRight': theme.spacing(1),
            'fill': '#6678F6',
            '& .MuiSvgIcon-root': {
                color: '#6678F6',
                marginRight: theme.spacing(1),
            },
            '& .MuiTypography-root': {
                color: '#6678F6',
                textTransform: 'uppercase'
            }
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
        },
    })
);

export const View: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();
    const location = useLocation();

    const _props = props!;
    const applicationId = _props.applicationId;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;
    const podsData = _props.podsData;

    const currentMicroservice = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }

    const [value, setValue] = useState(0);
    const [editMode, setEditMode] = useState(false);

    // TODO modify when we know how we want to handle state of purchase order data
    // Fake it till we are ready
    const msName = currentMicroservice.name;
    const searchParams = new URLSearchParams(location.search);

    const getFakeState = (searchParams: URLSearchParams): string => {
        if (!searchParams.has('dataState')) {
            return 'waiting';
        }
        return searchParams.get('dataState') as string;
    };
    const fakeState = getFakeState(searchParams);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

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
                    <Typography variant="h3" component="h3">{msName}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <DataStateIcon state={fakeState} />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={3}

            >
                <Grid item xs={10}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{ style: { background: '#ffffff' } }}
                    >
                        <Tab label='Configuration' />
                        <Tab label='Health Status' />
                    </Tabs>
                </Grid>

                <Grid
                    item xs={2}
                >
                    <Grid
                        container
                        direction='row'
                        justifyContent='space-around'
                        alignItems='flex-end'
                    >
                        <IconButton
                            onClick={() => {
                                enqueueSnackbar('TODO: Delete microservice', { variant: 'error' });
                            }}
                            className={classes.deleteIcon}
                        >
                            <DeleteIcon />
                            <Typography>delete</Typography>
                        </IconButton>


                        <IconButton
                            onClick={() => {
                                setEditMode(!editMode);
                            }}
                            className={classes.editIcon}
                        >
                            <EditIcon />
                            <Typography>Edit</Typography>
                        </IconButton>

                    </Grid>
                </Grid>
            </Grid>


            <TabPanel value={value} index={0}>
                <ViewConfiguration onSave={_onSave} microservice={currentMicroservice.edit} editMode={editMode} onCancel={() => {
                    setEditMode(false);
                }} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <HealthStatus applicationId={applicationId} status="TODO" environment={environment} data={podsData} />
            </TabPanel>
        </Grid >
    );
};
