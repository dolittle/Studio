// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Button, StatusIndicator } from '@dolittle/design-system';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { CACHE_KEYS } from '../../../../../../apis/integrations/CacheKeys';
import { useConnectionsIdMessageMappingsTablesTableMessagesMessageDeployPost, useConnectionsIdMessageMappingsDeployPost } from '../../../../../../apis/integrations/messageMappingApi.hooks';
import { ConnectionsIdMessageMappingsTablesTableMessagesMessageDeployPostRequest } from '../../../../../../apis/integrations/generated';
import { TableToolbarButton } from './TableToolbarButton';

export type DeployMessagesButtonProps = TableToolbarButton & {

};

export const DeployMessagesButton = ({
    connectionId,
    selectedMessageTypes,
    onActionExecuting,
    onSuccess,
    disable,
}: DeployMessagesButtonProps) => {
    const deployMappingsMutation = useConnectionsIdMessageMappingsDeployPost();
    const queryClient = useQueryClient();
    const hasSelectedMessages = selectedMessageTypes.length > 0;
    const hasMany = selectedMessageTypes.length > 1;
    const isLoading = deployMappingsMutation.isLoading;


    const handleDeployMessages = () => {
        onActionExecuting();
        deployMappingsMutation.mutate({
            id: connectionId,
            deployMapping: selectedMessageTypes.map(
                (messageType) => ({ message: messageType.name, table: messageType.fromTable?.name })
            )
        }, {
            onError(error, variables, context) {
                enqueueSnackbar(`Failed to deploy message types: ${error}`, { variant: 'error' });
                queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ConnectionMessageMappings_GET, connectionId] });
            },
            onSuccess(data, variables, context) {
                enqueueSnackbar(`Message types${hasMany ? 's' : ''} successfully deployed`, { variant: 'success' });
                onSuccess();
                queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ConnectionMessageMappings_GET, connectionId] });
            }
        });
    };

    return (
        <>
            {!isLoading
                ? <Button
                    label={`Deploy message types${hasMany ? 's' : ''}...`}
                    startWithIcon='RocketLaunch'
                    onClick={handleDeployMessages}
                    disabled={!hasSelectedMessages || disable}
                />
                : <StatusIndicator
                    label={`Deploying message type${hasMany ? 's' : ''}...`}
                    status='waiting'
                />}
        </>
    );
};
