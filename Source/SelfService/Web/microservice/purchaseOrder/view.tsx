// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Grid,
    IconButton,
    Typography,
    Tabs,
    Tab
} from '@material-ui/core';
import { TabPanel } from '../../utils/materialUi';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


import { microservices, savePurchaseOrderMicroservice } from '../../stores/microservice';
import { MicroservicePurchaseOrder } from '../../api/index';
import { HttpResponsePodStatus } from '../../api/api';
import { useGlobalContext } from '../../stores/notifications';
import { Configuration } from './configuration';
import { HealthStatus } from '../view/healthStatus';
import { useReadable } from 'use-svelte-store';

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

        }
    })
);

export const View: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();


    const $microservices = useReadable(microservices) as any;
    const history = useHistory();
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

    console.log(currentMicroservice);

    const { setNotification } = useGlobalContext();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const _onSave = (ms: MicroservicePurchaseOrder): void => {
        setNotification('TODO: update not done', 'error');
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
            alignItems='stretch'
        >
            <Grid
                container
                direction='row'
                justifyContent='space-between'
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { background: '#ffffff' } }}
                >
                    <Tab label='Configuration' />
                    <Tab label='Health Status' />
                </Tabs>

                <IconButton
                    onClick={() => {
                        setNotification('TODO: Delete microservice', 'info');
                    }}
                    className={classes.deleteIcon}
                >
                    <DeleteIcon />
                    <Typography>delete</Typography>
                </IconButton>
            </Grid>

            <TabPanel value={value} index={0}>
                <Configuration onSave={_onSave} microservice={currentMicroservice.edit} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <HealthStatus applicationId={applicationId} status="TODO" environment={environment} data={podsData} />
            </TabPanel>
        </Grid >
    );
};
