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
import Paper from '@material-ui/core/Paper';

import { microservices, savePurchaseOrderMicroservice } from '../../stores/microservice';
import { MicroservicePurchaseOrder } from '../../api/index';
import { HttpResponsePodStatus } from '../../api/api';
import { HealthStatus } from '../view/healthStatus';
import { useReadable } from 'use-svelte-store';
import { ViewConfiguration } from './viewConfiguration';
import { WaitForData } from './waitForData';

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
                color: 'white'
            },
            '& .MuiTypography-root': {
                color: 'white',
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

    // TODO waitForDataState figure out wait for data state
    // Fake it till we are ready
    const searchParams = new URLSearchParams(location.search);
    const waitForDataState = searchParams.get('waitForData')!;

    return (
        <Grid
            container
            direction='column'
            justifyContent='flex-start'
            alignItems='stretch'
        >
            <Grid container spacing={3}>
                <Grid item xs={8}>
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
                    item xs={4}
                >
                    <Grid
                        container
                        direction='row'
                        justifyContent='space-evenly'
                        alignItems='center'
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

                        {waitForDataState === 'fakeit' && (
                            <IconButton
                                onClick={() => {
                                    enqueueSnackbar('TODO: Edit microservice', { variant: 'error' });
                                }}
                                className={classes.deleteIcon}
                            >
                                <EditIcon />
                                <Typography>Edit</Typography>
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </Grid>


            <TabPanel value={value} index={0}>
                {waitForDataState !== 'fakeit' && (
                    <WaitForData onSave={_onSave} microservice={currentMicroservice.edit} />
                )}

                {waitForDataState === 'fakeit' && (
                    <ViewConfiguration onSave={_onSave} microservice={currentMicroservice.edit} />
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <HealthStatus applicationId={applicationId} status="TODO" environment={environment} data={podsData} />
            </TabPanel>
        </Grid >
    );
};
