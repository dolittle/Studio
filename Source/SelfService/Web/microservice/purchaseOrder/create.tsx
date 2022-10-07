// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Grid, Button, Typography } from '@mui/material';
import { TabPanel } from '../../utils/materialUi';

import { Guid } from '@dolittle/rudiments';

import { savePurchaseOrderMicroservice } from '../../stores/microservice';
import { HttpResponseApplication } from '../../api/application';
import { MicroservicePurchaseOrder } from '../../api/index';
import { getLatestRuntimeInfo } from '../../api/api';
import { Configuration } from './configuration';
import { Tab, Tabs } from '../../theme/tabs';

type CreateProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const Create = ({ application: { id, customerId }, environment }: CreateProps) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const microserviceId = Guid.create().toString();
    const headImage = 'dolittle/integrations-m3-purchaseorders:latest';
    const runtimeInfo = getLatestRuntimeInfo();

    const ms: MicroservicePurchaseOrder = {
        dolittle: {
            applicationId: id,
            customerId,
            microserviceId,
        },
        name: '',
        kind: 'purchase-order-api',
        environment,
        extra: {
            ingress: {
                path: '/api/webhooks',
                pathType: 'Prefix'
            },
            headImage,
            runtimeImage: runtimeInfo.image,
            webhooks: [],
            rawDataLogName: 'raw-data-log-v1',
        },
    };

    const handleChange = () => {
        enqueueSnackbar('Health Status is only available after microservice is created.', { variant: 'error' });
    };

    const _onSave = (ms: MicroservicePurchaseOrder): void => {
        // TODO handle exception (maybe move to wait)
        savePurchaseOrderMicroservice(ms).then((data) => {
            const href = `/microservices/application/${id}/${environment}/view/${microserviceId}?firstTime=1`;
            history.push(href);
        }).catch(reason => console.log(reason));
    };

    return (
        <Grid container direction='column' justifyContent='flex-start'>
            <Typography variant='h1' my={2}>Create purchase order API</Typography>

            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Tabs
                        value={0}
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
                        <Button
                            onClick={() => {
                                const href = `/microservices/application/${id}/${environment}/create`;
                                history.replace(href);
                            }}
                        >
                            cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>



            <TabPanel value={0} index={0}>
                <Configuration onSave={_onSave} microservice={ms} />
            </TabPanel>
        </Grid >
    );
};
