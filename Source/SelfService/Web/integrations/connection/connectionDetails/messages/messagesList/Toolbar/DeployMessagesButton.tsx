// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {  } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Button, StatusIndicator } from '@dolittle/design-system';
import { useConnectionsIdMessageMappingsDeployPost } from '../../../../../../apis/integrations/messageMappingApi.hooks';
import { TableToolbarButton } from './TableToolbarButton';

export type DeployMessagesButtonProps = TableToolbarButton & {

};

export const DeployMessagesButton = ({
    connectionId,
    selectedMessageTypes,
    onActionExecuting,
    onActionCompleted,
    disable,
}: DeployMessagesButtonProps) => {
    const deployMappingsMutation = useConnectionsIdMessageMappingsDeployPost();
    const hasSelectedMessages = selectedMessageTypes.length > 0;
    const hasMany = selectedMessageTypes.length > 1;
    const isLoading = deployMappingsMutation.isLoading;


    const handleDeployMessages = () => {
        onActionExecuting();
        deployMappingsMutation.mutate({
            id: connectionId,
            mappingReference: selectedMessageTypes.map(
                (messageType) => ({ message: messageType.name, table: messageType.fromTable.name })
            )
        }, {
            onError(error, variables, context) {
                enqueueSnackbar(`Failed to deploy message types: ${error}`, { variant: 'error' });
                //TODO: Handle error return object to mark which message types failed to deploy
            },
            onSuccess(data, variables, context) {
                enqueueSnackbar(`Message type${hasMany ? 's' : ''} successfully deployed`);
            },
            onSettled() {
                onActionCompleted();
            }
        });
    };

    return (
        <>
            {!isLoading
                ? <Button
                    label={`Deploy message type${hasMany ? 's' : ''}...`}
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
