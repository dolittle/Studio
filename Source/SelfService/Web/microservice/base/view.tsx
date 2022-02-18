// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Grid,
    IconButton,
    Typography,
    Divider,
    Box,
} from '@material-ui/core';
import { TabPanel } from '../../utils/materialUi';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { HttpResponsePodStatus } from '../../api/api';
import { HealthStatus } from '../view/healthStatus';
import { useReadable } from 'use-svelte-store';
import { microservices, MicroserviceStore, canDeleteMicroservice, canEditMicroservice } from '../../stores/microservice';
import { View as ConfigView } from './configView';
import { Tab, Tabs } from '../../theme/tabs';
import { DownloadButtons } from '../components/downloadButtons';
import { MicroserviceSimple } from '../../api/index';
import { View as LiveIngressView } from './liveIngressView';
import { ButtonText } from '../../theme/buttonText';
import { HttpResponseApplication } from '../../api/application';


type Props = {
    application: HttpResponseApplication
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

    const _props = props!;
    const application = _props.application;
    const applicationId = application.id;
    const microserviceId = _props.microserviceId;
    const environment = _props.environment;
    const podsData = _props.podsData;

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


        // TODO currently we don't use the ms.extra.ingress in the view
        // Look to "liveIngressView" for how we "set" the data to uniq paths
        ms = {
            dolittle: {
                applicationId,
                tenantId: application.tenantId,
                microserviceId,
            },
            name: currentMicroservice.name,
            kind: 'unknown',
            environment: _props.environment,
            extra: {
                ingress: {
                    path: '',
                    pathType: ''
                },
                headImage,
                runtimeImage,
            },
        };
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
                                if (!canDelete) {
                                    enqueueSnackbar('Deleting microservice is disabled', { variant: 'error' });
                                    return;
                                }

                                const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/delete`;
                                history.push(href);
                            }}
                            className={classes.deleteIcon}
                        >
                            <DeleteIcon />
                            <Typography>delete</Typography>
                        </IconButton>


                        <IconButton
                            onClick={() => {
                                enqueueSnackbar('TODO: Edit microservice', { variant: 'error' });
                            }}
                            className={classes.editIcon}
                        >
                            <EditIcon />
                            <Typography>Edit</Typography>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>


            <TabPanel value={currentTab} index={0}>
                <Box ml={2}>
                    <ConfigView microservice={ms} />
                </Box>
                <Divider className={classes.divider} />
                <Box ml={2}>
                    <LiveIngressView urls={currentMicroservice.live.ingressUrls} paths={currentMicroservice.live.ingressPaths} />
                </Box>
                <Divider className={classes.divider} />
                <Box ml={2}>
                    <ButtonText
                        onClick={async () => {
                            const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/environment-variables`;
                            history.push(href);
                        }}
                    >Manage environment variables</ButtonText>

                    <DownloadButtons
                        environment={environment}
                        microserviceName={msName}
                        applicationId={applicationId}
                    />
                </Box>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <HealthStatus applicationId={applicationId} status="TODO" environment={environment} microserviceId={microserviceId} data={podsData} />
            </TabPanel>
        </Grid >
    );
};
