// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Box, Typography, Select, MenuItem } from '@mui/material';

import { Button, ContentContainer, ContentHeader, ContentParagraph, ContentSection, IconButton, Link, StatusIndicator, StatusIndicatorProps, Switch } from '@dolittle/design-system';
import { RestApiServiceStatus } from '../../../../apis/integrations/generated';
import { useConnectionsIdRestApiStatusGet, useConnectionsIdRestApiEnablePost, useConnectionsIdRestApiDisablePost } from '../../../../apis/integrations/connectionRestApiApi.hooks';
import { CACHE_KEYS } from '../../../../apis/integrations/CacheKeys';
import { useConnectionIdFromRoute } from '../../../routes.hooks';
import { CredentialsContainer } from './Credentials/CredentialsContainer';
import { EnableRestApiSection } from './EnableRestApiSection';

/* The ERP ReadModels -service must be specific to the connection, so we need
    to generate the URL dynamically. */

export const ConsumeDataRestAPIView = () => {
    const [forceShowEnable, setForceShowEnable] = React.useState(true);
    const [forcedServiceStatus, setForcedServiceStatus] = React.useState<RestApiServiceStatus | ''>('');
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionIdFromRoute();
    const { data: apiStatus } = useConnectionsIdRestApiStatusGet(
        { id: connectionId },
        {
            refetchInterval: (data) => {
                return data?.service === 'Deploying' ? 1000 : 4000;
            }
        }
    );
    const enableMutation = useConnectionsIdRestApiEnablePost();
    const disableMutation = useConnectionsIdRestApiDisablePost();
    const queryClient = useQueryClient();


    const handleRestApiLinkCopy = () => {
        navigator.clipboard.writeText(restApiUrl);
        enqueueSnackbar('Rest API URL copied to clipboard.');
    };

    const handleOpenApiDocumentationLinkCopy = () => {
        navigator.clipboard.writeText(openApiDocumentationUrl);
        enqueueSnackbar('OpenAPI documentation copied to clipboard.');
    };

    const serviceStatus = forcedServiceStatus || apiStatus?.service;
    const showEnableSection = (apiStatus?.target === 'Disabled') || serviceStatus === 'Deploying' || forceShowEnable;

    const restApiUrl = `${apiStatus?.basePath}swagger/index.html`;
    const openApiDocumentationUrl = `${apiStatus?.basePath}swagger/v1/swagger.json`;

    const statusIndicatorFromServiceStatus = (status: RestApiServiceStatus | ''): StatusIndicatorProps['status'] => {
        switch (status?.toLocaleLowerCase()) {
            case 'off':
                return 'error';
            case 'deploying':
                return 'waiting';
            case 'active':
                return 'success';
            case 'unhealthy':
                return 'warning';
            case 'terminating':
                return 'waiting';
        }
        return 'unknown';
    };

    const handleEnableRestApi = () => {
        setForceShowEnable(false);
        enableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionRestApiStatus_GET, connectionId]);
                enqueueSnackbar('Rest API service is being deployed. You will be able to access it in a few minutes.');
            },
            onError: (error) => {
                enqueueSnackbar('Something went wrong deploying the Rest API service. Error: ' + error, { variant: 'error' });
            }
        });
    };

    const handleDisableRestApi = () => {
        setForceShowEnable(true);
        disableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionRestApiStatus_GET, connectionId]);
                enqueueSnackbar('Rest API service has been disabled.');
            },
            onError: (error) => {
                enqueueSnackbar('Something went wrong while disabling the Rest API service. Error: ' + error, { variant: 'error' });
            }
        });
    };


    return (
        <>
            <Switch.UI
                id='deploy-switch'
                label='Force deployed'
                checked={!forceShowEnable}
                sx={{ mx: 0 }}
                onChange={() => setForceShowEnable(!forceShowEnable)}
            />
            <Select
                id='service-status'
                label='Simulated Service Status'
                onChange={(event) => setForcedServiceStatus(event.target.value as RestApiServiceStatus | '')}>
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='Off'>Off</MenuItem>
                <MenuItem value='Deploying'>Deploying</MenuItem>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Unhealthy'>Unhealthy</MenuItem>
                <MenuItem value='Terminating'>Terminating</MenuItem>
            </Select>
            <ContentContainer>
                <ContentHeader
                    title='Consume data over a REST API'
                    status={{
                        status: statusIndicatorFromServiceStatus(serviceStatus || ''),
                        label: serviceStatus
                    }}
                    buttonsSlot={
                        <>
                            {(!forceShowEnable) &&
                                <Button
                                    label='Disable Rest API'
                                    variant='outlined'
                                    color='error'
                                    disabled={serviceStatus && (serviceStatus === 'Off' || serviceStatus === 'Terminating' || serviceStatus === 'Deploying')}
                                    onClick={() => handleDisableRestApi()}
                                />
                            }
                        </>
                    }
                />
                <ContentParagraph>
                    The Rest API service is a dedicated service for your connector that exposes the message types you have set up.
                    The API is fully documented using OpenAPI specifications and will reflect the message types set up for the connector.
                </ContentParagraph>
                {showEnableSection
                    ? <EnableRestApiSection
                        onEnableRestApi={() => handleEnableRestApi()}
                        status={serviceStatus || 'Off'}
                        isEnabling={enableMutation.isLoading}
                    />
                    : <>
                        <ContentSection title='Rest API URL'>
                            <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                                <Link
                                    target
                                    href={restApiUrl}
                                    message={restApiUrl}
                                />
                                <IconButton
                                    tooltipText='Copy rest API URL link to clipboard'
                                    icon='CopyAllRounded'
                                    color='primary'
                                    onClick={handleRestApiLinkCopy}
                                />
                            </Box>
                        </ContentSection>

                        <ContentSection title='Rest API Documentation'>
                            <Typography sx={{ pt: 1.5 }}>Our rest API is documented using OpenAPI.</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                                <Link
                                    target
                                    ariaLabel='OpenAPI documentation'
                                    href={openApiDocumentationUrl}
                                    message={openApiDocumentationUrl}
                                />
                                <IconButton
                                    tooltipText='Copy OpenAPI documentation link to clipboard'
                                    icon='CopyAllRounded'
                                    color='primary'
                                    onClick={handleOpenApiDocumentationLinkCopy}
                                />
                            </Box>
                        </ContentSection>
                    </>
                }
                <CredentialsContainer />
            </ContentContainer>

        </>
    );
};

