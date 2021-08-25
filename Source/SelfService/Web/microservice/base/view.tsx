// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';


import { getServerUrlPrefix, HttpResponsePodStatus } from '../../api/api';
import { HealthStatus } from '../view/healthStatus';
import { useReadable } from 'use-svelte-store';
import { microservices } from '../../stores/microservice';
import { ConfigView } from './configView';
import { ConfigViewK8s } from './configViewK8s';
import { SecondaryButton } from '../../theme/secondaryButton';
import { DownloadLogIcon } from '../../theme/icons';
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
}));

type Props = {
    applicationId: string
    environment: string
    microserviceId: string
    podsData: HttpResponsePodStatus
};

export const View2: React.FunctionComponent<Props> = (props) => {
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

    const configMapPrefix = `${environment.toLowerCase()}-${currentMicroservice.name.toLowerCase()}`;

    let hasEditData = false;
    if (currentMicroservice.edit &&
        currentMicroservice.edit.dolittle &&
        currentMicroservice.id !== '' &&
        currentMicroservice.kind !== '') {
        hasEditData = true;
    }


    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
        >
            <h1>{currentMicroservice.name}</h1>
            <div className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ style: { background: '#ffffff' } }}
                >
                    <Tab label="Config" />
                    <Tab label="Health Status" />
                </Tabs>

                <TabPanel value={value} index={0}>
                    {hasEditData
                        ? <ConfigView microservice={currentMicroservice.edit} />
                        : <ConfigViewK8s microservice={currentMicroservice.live} />
                    }
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <HealthStatus applicationId={applicationId} status="TODO" environment={environment} data={podsData} />
                </TabPanel>
            </div>

            <SecondaryButton
                title="Download secret env-variables yaml"
                icon={DownloadLogIcon}
                onClick={() => {
                    const secretName = `${configMapPrefix}-secret-env-variables`;
                    const href = `${getServerUrlPrefix()}/live/application/${applicationId}/secret/${secretName}?download=1&fileType=yaml`;
                    window.open(href, '_blank');
                }}
            />

            <SecondaryButton
                title="Download config files yaml"
                icon={DownloadLogIcon}
                onClick={() => {
                    const configMapName = `${configMapPrefix}-config-files`;
                    const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                    window.open(href, '_blank');
                }}
            />

            <SecondaryButton
                title="Download env-variables yaml"
                icon={DownloadLogIcon}
                onClick={() => {
                    const configMapName = `${configMapPrefix}-env-variables`;
                    const href = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${configMapName}?download=1&fileType=yaml`;
                    window.open(href, '_blank');
                }}
            />
        </Grid>
    );
};
