// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useReadable } from 'use-svelte-store';

import { microservices, MicroserviceStore, canEditMicroservice } from '../../stores/microservice';
import { Configuration } from './configuration';
import { HttpResponsePodStatus } from '../../api/api';
import { MicroserviceSimple } from '../../api/index';
import { HttpResponseApplication } from '../../api/application';

import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { HealthStatus } from './healthStatus/healthStatus';
import { ConstainerHealthStatus } from '../microserviceStatus';

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const StyledTabs = styled(((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
)))<StyledTabsProps>(({ theme }) => ({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: theme.palette.primary.main,
    },
}));

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box>
                {children}
            </Box>
        )}
    </div>
);

const styles = {
    tabs: {
        'fontWeight': 500,
        'fontSize': 13,
        'letterSpacing': '0.06em',
        '&:first-of-type': {
            mr: 8
        }
    }
};

type MicroserviceViewProps = {
    application: HttpResponseApplication;
    environment: string;
    microserviceId: string;
    podsData: HttpResponsePodStatus;
};

export const MicroserviceView = ({ application, microserviceId, environment, podsData }: MicroserviceViewProps) => {
    const $microservices = useReadable(microservices) as any;
    const history = useHistory();

    const getContainerStatuses = () => {
        return podsData.pods.flatMap(pod => {
            return pod.containers.map((container) => {
                return container.state;
            });
        });
    };

    const applicationId = application.id;

    const currentMicroservice: MicroserviceStore = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/microservices/application/${application.id}/${environment}/overview`;
        history.push(href);
        return null;
    }

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
            || 'N/A';
        const runtimeImage = currentMicroservice.live.images.find(img => img.name === 'runtime')?.image
            || 'N/A';

        const headCommand = {
            command: [],
            args: []
        };

        const environmentInfo = application.environments.find(_environment => _environment.name === environment)!;
        // TODO currently we don't use the ms.extra.ingress in the view
        // Look to "liveIngressView" for how we "set" the data to uniq paths
        ms = {
            dolittle: {
                applicationId,
                customerId: application.customerId,
                microserviceId,
            },
            name: currentMicroservice.name,
            kind: 'unknown',
            environment,
            extra: {
                ingress: {
                    path: '',
                    pathType: ''
                },
                headPort: 80,
                isPublic: true,
                headImage,
                runtimeImage,
                headCommand,
                connections: environmentInfo.connections,
            },
        };
    }

    const msName = currentMicroservice.name;

    const [currentTab, setCurrentTab] = useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setCurrentTab(newValue);
    };

    return (
        <>
            <Box sx={{ display: 'flex', mb: 3.25 }}>
                <Typography variant="h1">{msName}</Typography>
                <ConstainerHealthStatus status={getContainerStatuses()} />
            </Box>

            <StyledTabs value={currentTab} onChange={handleChange} sx={{ mb: 4 }}>
                <Tab sx={styles.tabs} label='Configuration' />
                <Tab sx={styles.tabs} label='Health Status' />
            </StyledTabs>

            <TabPanel value={currentTab} index={0}>
                <Configuration
                    applicationId={applicationId}
                    environment={environment}
                    microserviceId={microserviceId}
                    msName={msName}
                    ingressUrls={currentMicroservice.live.ingressUrls}
                    ingressPaths={currentMicroservice.live.ingressPaths}
                    ms={ms}
                    onClick={async () => {
                        const href = `/microservices/application/${applicationId}/${environment}/view/${microserviceId}/environment-variables`;
                        history.push(href);
                    }}
                />
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
                <HealthStatus
                    applicationId={applicationId}
                    status="TODO" environment={environment}
                    microserviceId={microserviceId}
                    data={podsData}
                />
            </TabPanel>
        </>
    );
};
