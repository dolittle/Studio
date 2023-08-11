// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useReducer } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Select, MenuItem } from '@mui/material';

import { Button, ContentContainer, ContentHeader, ContentParagraph, StatusIndicatorProps, Switch } from '@dolittle/design-system';
import { RestApiServiceStatus } from '../../../../apis/integrations/generated';
import { useConnectionsIdRestApiStatusGet, useConnectionsIdRestApiEnablePost, useConnectionsIdRestApiDisablePost } from '../../../../apis/integrations/connectionRestApiApi.hooks';
import { CACHE_KEYS } from '../../../../apis/integrations/CacheKeys';
import { useConnectionIdFromRoute } from '../../../routes.hooks';
import { CredentialsContainer } from './Credentials/CredentialsContainer';
import { EnableRestApiSection } from './EnableRestApiSection';
import { DisableRestApiDialog, disableRestApiDialogReducer } from './DisableRestApiDialog';
import { RestApiDescriptionSection } from './RestApiDescriptionSection';

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
    const [disableServiceDialogState, disableServiceDialogDispatch] = useReducer(disableRestApiDialogReducer, { isOpen: false });


    const serviceStatus = forcedServiceStatus || apiStatus?.service;
    const showEnableSection = (apiStatus?.target === 'Disabled') || serviceStatus === 'Deploying' || forceShowEnable;


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
        disableServiceDialogDispatch({ type: 'close' });
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
                <DisableRestApiDialog dispatch={disableServiceDialogDispatch} state={disableServiceDialogState} onConfirm={handleDisableRestApi} />
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
                                    onClick={() => disableServiceDialogDispatch({ type: 'open' })}
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
                    : <RestApiDescriptionSection restApiBaseUrl={apiStatus?.basePath || ''} />
                }
                <CredentialsContainer />
            </ContentContainer>

        </>
    );
};

