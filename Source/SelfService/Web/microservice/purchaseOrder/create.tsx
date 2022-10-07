// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Button, Typography } from '@mui/material';

import { Guid } from '@dolittle/rudiments';
import { Tabs } from '@dolittle/design-system/atoms/Tabs/Tabs';

import { savePurchaseOrderMicroservice } from '../../stores/microservice';
import { HttpResponseApplication } from '../../api/application';
import { MicroservicePurchaseOrder } from '../../api/index';
import { getLatestRuntimeInfo } from '../../api/api';
import { Configuration } from './configuration';

import { Notification } from '../../theme/Notification';

type CreateProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const Create = ({ application: { id, customerId }, environment }: CreateProps) => {
    const history = useHistory();

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

    const handleCancel = () => {
        const href = `/microservices/application/${id}/${environment}/create`;
        history.replace(href);
    };

    const _onSave = (ms: MicroservicePurchaseOrder): void => {
        // TODO handle exception (maybe move to wait)
        savePurchaseOrderMicroservice(ms).then((data) => {
            const href = `/microservices/application/${id}/${environment}/view/${microserviceId}?firstTime=1`;
            history.push(href);
        }).catch(reason => console.log(reason));
    };

    return (
        <>
            <Grid container direction='column'>
                <Typography variant='h1' my={2}>Create purchase order API</Typography>
                <Button sx={{ alignSelf: 'flex-end' }} onClick={handleCancel}>Cancel</Button>
            </Grid>

            <Tabs
                sx={{ mb: 3.25 }}
                tabs={[
                    {
                        label: 'Configuration',
                        render: () => <Configuration onSave={_onSave} microservice={ms} />,
                    },
                    {
                        label: 'Health Status',
                        render: () => <Notification title='Health Status is only available after microservice is created.' />,
                    }
                ]}
            />
        </>
    );
};
