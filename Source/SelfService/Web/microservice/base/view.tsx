// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Divider, Grid } from '@material-ui/core';
import { useReadable } from 'use-svelte-store';

import { HttpResponsePodStatus } from '../../api/api';
import { HealthStatus } from '../view/healthStatus';
import { microservices } from '../../stores/microservice';
import { ConfigView } from './configView';
import { ConfigViewK8s } from './configViewK8s';
import { Tab, Tabs } from '../../theme/tabs';
// TODO Doesnt seem ready for prime time, this is from the example and the github issue
import { TabPanel } from '../../utils/materialUi';
import { DownloadButtons } from '../components/downloadButtons';

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
    podsData: HttpResponsePodStatus
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            backgroundColor: '#3B3D48'
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

    const [selectedKey, setSelectedKey] = useState('healthStatus');
    // Want microservice name

    const currentMicroservice = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/microservices/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }

    let hasEditData = false;
    if (currentMicroservice.edit &&
        currentMicroservice.edit.dolittle &&
        currentMicroservice.id !== '' &&
        currentMicroservice.kind !== '') {
        hasEditData = true;
    }

    const [currentTab, setCurrentTab] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <h1>{currentMicroservice.name}</h1>
            <div>
                <Tabs
                    value={currentTab}
                    onChange={handleChange}
                >
                    <Tab label="Config" />
                    <Tab label="Health Status" />
                </Tabs>

                <TabPanel value={currentTab} index={0}>
                    <Box ml={2}>
                        {hasEditData
                            ? <ConfigView microservice={currentMicroservice.edit} />
                            : <ConfigViewK8s microservice={currentMicroservice.live} />
                        }
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
            </div>
        </Grid>
    );
};
