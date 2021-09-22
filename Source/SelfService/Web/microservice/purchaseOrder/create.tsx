// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Grid,
    Tabs,
    Tab
} from '@material-ui/core';
import { TabPanel } from '../../utils/materialUi';
import { Guid } from '@dolittle/rudiments';


import { savePurchaseOrderMicroservice, getFirstIngressFromApplication } from '../../stores/microservice';
import { MicroservicePurchaseOrder } from '../../api/index';
import { HttpResponseApplications2 } from '../../api/api';
import { useGlobalContext } from '../../stores/notifications';
import { Configuration } from './configuration';

type Props = {
    application: HttpResponseApplications2;
    environment: string;
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();

    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;


    const { setNotification } = useGlobalContext();

    const microserviceId = Guid.create().toString();
    const headImage = 'dolittle/integrations-m3-purchaseorders:latest';
    const runtimeImage = 'dolittle/runtime:6.1.0';
    const ingressInfo = getFirstIngressFromApplication(_props.application, environment);

    const ms: MicroservicePurchaseOrder = {
        dolittle: {
            applicationId: application.id,
            tenantId: application.tenantId,
            microserviceId,
        },
        name: '',
        kind: 'purchase-order-api',
        environment: _props.environment,
        extra: {
            ingress: {
                path: '/api/webhooks',
                pathType: 'Prefix',
                host: ingressInfo.host,
                domainPrefix: ingressInfo.domainPrefix
            },
            headImage,
            runtimeImage,
            webhooks: [],
            rawDataLogName: 'raw-data-log-v1',
        },
    };


    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setNotification(
            'Health Status only available after microservice created',
            'error'
        );
    };

    const _onSave = (ms: MicroservicePurchaseOrder): void => {
        // TODO handle exception (maybe move to wait)
        savePurchaseOrderMicroservice(ms).then((data) => {
            // TODO We want to take them to the actual new microservice and set to step 3.
            //const href = `/microservices/application/${application.id}/${environment}/overview`;
            // Not sure if we need the step
            const href = `/microservices/application/${application.id}/${environment}/view/${microserviceId}`;
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
            <h1>Create purchase order API</h1>
            <Grid
                container
                direction='row'
                justifyContent='space-between'
            >
                <Tabs
                    value={0}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { background: '#ffffff' } }}
                >
                    <Tab label='Configuration' />
                    <Tab label='Health Status' />
                </Tabs>
            </Grid>

            <TabPanel value={0} index={0}>
                <Configuration onSave={_onSave} microservice={ms} />
            </TabPanel>
        </Grid >
    );
};
