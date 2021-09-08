// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '../../utils/materialUi';


import { HttpResponsePodStatus } from '../../api/api';
import { useGlobalContext } from '../../stores/notifications';
import { useReadable } from 'use-svelte-store';
import { microservices } from '../../stores/microservice';
import { HealthStatus } from '../view/healthStatus';
import { Overview } from './overview';

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
    podsData: HttpResponsePodStatus
};

export const View: React.FunctionComponent<Props> = (props) => {
    // TODO this is not done
    const { setNotification } = useGlobalContext();
    // Default to health
    const [value, setValue] = React.useState(2);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

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

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <h1>Microservice Specific</h1>
            <h1>TODO Purchase Order</h1>
            <h2>Env: {_props.environment}</h2>
            <h2>TenantID: {currentMicroservice.application.tenantId}</h2>

            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { background: '#ffffff' } }}
                >
                    <Tab label="Overview" />
                    <Tab label="Config" />
                    <Tab label="Health Status" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    {/* <Overview /> */}
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <p>TODO</p>
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <HealthStatus applicationId={applicationId} status="TODO" environment={environment} data={podsData} />
                </TabPanel>
            </div>


        </Grid>
    );
};
