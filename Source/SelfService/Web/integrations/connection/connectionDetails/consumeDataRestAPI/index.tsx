// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { Button, ContentContainer, ContentHeader, ContentParagraph } from '@dolittle/design-system';

import { useConnectionsIdRestApiStatusGet, useConnectionsIdRestApiEnablePost, useConnectionsIdRestApiDisablePost } from '../../../../apis/integrations/connectionRestApiApi.hooks';
import { CACHE_KEYS } from '../../../../apis/integrations/CacheKeys';

import { useConnectionIdFromRoute } from '../../../routes.hooks';

import { AccessIndex } from './access';
import { CredentialsIndex } from './Credentials';
import { DisableRestApiDialog } from './DisableRestApiDialog';

import { getIndicatorStatusFromStatusMessage } from '../../../statusHelpers';

/* The ERP ReadModels -service must be specific to the connection, so we need
    to generate the URL dynamically. */

export const ConsumeDataRestAPIView = () => {
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const connectionId = useConnectionIdFromRoute();
    const enableMutation = useConnectionsIdRestApiEnablePost();
    const disableMutation = useConnectionsIdRestApiDisablePost();
    const { data: apiStatus, isLoading } = useConnectionsIdRestApiStatusGet(
        { id: connectionId },
        {
            refetchInterval: data => {
                // This will reset the credentials dialog input fields.
                // As a workaround, we disabled the button while the service is deploying or terminating.
                const workInProgress = data?.service === 'Deploying' || data?.service === 'Terminating';
                return workInProgress ? 10000 : false;
            },
        },
    );

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const serviceStatus = apiStatus?.service || 'Off';
    const showEnableSection = (apiStatus?.target === 'Disabled') || serviceStatus === 'Deploying';
    const isButtonsDisabled = serviceStatus === 'Deploying' || serviceStatus === 'Terminating';
    const shouldDisableDisableButton = serviceStatus === 'Off' || serviceStatus === 'Deploying' || serviceStatus === 'Terminating';
    const serviceStatusIndicator = getIndicatorStatusFromStatusMessage(apiStatus?.status);

    const handleEnableRestApi = () => {
        enableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionRestApiStatus_GET, connectionId]);
                enqueueSnackbar('Rest API service is being deployed. You will be able to access it in a few minutes.');
            },
            onError: error => {
                enqueueSnackbar('Something went wrong deploying the Rest API service. Error: ' + error, { variant: 'error' });
            },
        });
    };

    const handleDisableRestApi = () => {
        setIsDeleteDialogOpen(false);

        disableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionRestApiStatus_GET, connectionId]);
                enqueueSnackbar('Rest API service has been disabled.');
            },
            onError: error => {
                enqueueSnackbar('Something went wrong while disabling the Rest API service. Error: ' + error, { variant: 'error' });
            },
        });
    };

    return (
        <ContentContainer>
            <DisableRestApiDialog isOpen={isDeleteDialogOpen} onCancel={() => setIsDeleteDialogOpen(false)} onConfirm={handleDisableRestApi} />

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
                                onClick={() => setIsDeleteDialogOpen(true)}
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
                <AccessIndex
                    isApiDisabled={showEnableSection}
                    isButtonDisabled={isButtonsDisabled}
                    onEnableRestApi={() => handleEnableRestApi()}
                    restApiBaseUrl={apiStatus?.basePath || ''}
                />
            }

            <CredentialsIndex isButtonDisabled={isButtonsDisabled} />
        </ContentContainer>
    );
};
