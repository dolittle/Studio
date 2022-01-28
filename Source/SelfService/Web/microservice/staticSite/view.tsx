// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    Grid,
    IconButton,
    Typography,
    Divider,
    Box,
} from '@material-ui/core';
import { TabPanel } from '../../utils/materialUi';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { ConfigViewK8s } from '../base/configViewK8s';
import { microservices } from '../../stores/microservice';

import { HttpResponsePodStatus } from '../../api/api';
import { HealthStatus } from '../view/healthStatus';
import { useReadable } from 'use-svelte-store';

import { Tab, Tabs } from '../../theme/tabs';
import { DownloadButtons } from '../components/downloadButtons';
import { View as FilesView } from './files/view';


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
        divider: {
            backgroundColor: '#3B3D48'
        }
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

    const msName = currentMicroservice.name;

    const [currentTab, setCurrentTab] = useState(1);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
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
            </Grid>

            <Grid
                container
                spacing={3}

            >
                <Grid item xs={10}>
                    <Tabs
                        value={currentTab}
                        onChange={handleChange}
                    >
                        <Tab label='Configuration' />
                        <Tab label='Health Status' />
                        <Tab label='Files' />
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
                    </Grid>
                </Grid>
            </Grid>


            <TabPanel value={currentTab} index={0}>
                <Box ml={2}>
                    <h1>TODO: Config</h1>
                    <ConfigViewK8s microservice={currentMicroservice.live} />
                </Box>
                <Divider className={classes.divider} />
                <Box ml={2}>
                    <DownloadButtons
                        environment={environment}
                        microserviceName={currentMicroservice.name}
                        applicationId={applicationId}
                    />
                </Box>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <HealthStatus applicationId={applicationId} status="TODO" environment={environment} data={podsData} />
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
                <FilesView environment={environment}
                    microserviceId={microserviceId}
                    applicationId={applicationId}
                />
            </TabPanel>
        </Grid >
    );
};
