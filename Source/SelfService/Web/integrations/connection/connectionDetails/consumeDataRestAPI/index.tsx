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
import { CredentialsSection } from './Credentials/CredentialsSection';
import { EnableRestApiSection } from './EnableRestApiSection';
import { DisableRestApiDialog, disableRestApiDialogReducer } from './DisableRestApiDialog';
import { RestApiDescriptionSection } from './RestApiDescriptionSection';
import { getIndicatorStatusFromStatusMessage } from '../../../statusHelpers';

/* The ERP ReadModels -service must be specific to the connection, so we need
    to generate the URL dynamically. */

export const ConsumeDataRestAPIView = () => {
    // const [forceShowEnable, setForceShowEnable] = React.useState(true);
    // const [forcedServiceStatus, setForcedServiceStatus] = React.useState<RestApiServiceStatus | ''>('');
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionIdFromRoute();
    const { data: apiStatus, isLoading } = useConnectionsIdRestApiStatusGet(
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


    const serviceStatus = apiStatus?.service || 'Off';
    const showEnableSection = (apiStatus?.target === 'Disabled') || serviceStatus === 'Deploying';
    const shouldDisableDisableButton = serviceStatus === 'Off' || serviceStatus === 'Deploying' || serviceStatus === 'Terminating';
    const serviceStatusIndicator = getIndicatorStatusFromStatusMessage(apiStatus?.status);

    const handleEnableRestApi = () => {
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
            <ContentContainer>
                <DisableRestApiDialog dispatch={disableServiceDialogDispatch} state={disableServiceDialogState} onConfirm={handleDisableRestApi} />
                <ContentHeader
                    title='REST API'
                    status={!isLoading && serviceStatusIndicator
                        ? {
                            status: serviceStatusIndicator.status,
                            label: serviceStatusIndicator.label,
                            message: serviceStatusIndicator.message,
                        }
                        : undefined
                    }
                    buttonsSlot={
                        <>
                            {(!showEnableSection) &&
                                <Button
                                    label='Disable Rest API'
                                    variant='outlined'
                                    color='error'
                                    disabled={shouldDisableDisableButton}
                                    onClick={() => disableServiceDialogDispatch({ type: 'open' })}
                                />
                            }
                        </>
                    }
                />
                <ContentParagraph>
                    The Rest API service exposes the message types for the connector to be consumed in external applications and services.
                    The API is fully documented using OpenAPI specifications and will reflect the message types set up for the connector.
                </ContentParagraph>
                {!isLoading &&
                    <>
                        {showEnableSection
                            ? <EnableRestApiSection
                                onEnableRestApi={() => handleEnableRestApi()}
                                status={serviceStatus || 'Off'}
                                isEnabling={enableMutation.isLoading}
                            />
                            : <RestApiDescriptionSection restApiBaseUrl={apiStatus?.basePath || ''} />
                        }
                    </>
                }
                <CredentialsSection />
            </ContentContainer>

        </>
    );
};

