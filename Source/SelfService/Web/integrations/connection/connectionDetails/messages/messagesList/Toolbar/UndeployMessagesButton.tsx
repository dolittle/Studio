// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { enqueueSnackbar } from 'notistack';

import { Button, StatusIndicator } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsUndeployMultiplePost } from '../../../../../../apis/integrations/messageMappingApi.hooks';

import { TableToolbarButton } from './TableToolbarButton';

export type DeleteMessagesProps = TableToolbarButton & {};

export const UndeployMessagesButton = ({ connectionId, selectedMessageTypes, onActionExecuting, onActionCompleted, disable }: DeleteMessagesProps) => {
    const undeployMultipleMutation = useConnectionsIdMessageMappingsUndeployMultiplePost();

    const isLoading = undeployMultipleMutation.isLoading;
    const hasSelectedMessages = selectedMessageTypes.length > 0;
    const hasMany = selectedMessageTypes.length > 1;

    const handleUndeployMessages = () => {
        onActionExecuting();
        undeployMultipleMutation.mutate({
            id: connectionId,
            mappingReference: selectedMessageTypes.map(messageType => ({ message: messageType.name, table: messageType.fromTable.name })),
        }, {
            onError(error, variables, context) {
                enqueueSnackbar(`Failed to undeploy message types: ${error}`, { variant: 'error' });
                //TODO: Handle error return object to mark which message types failed to delete
            },
            onSuccess(data, variables, context) {
                enqueueSnackbar(`Message types${hasMany ? 's' : ''} successfully undeployed`);
            },
            onSettled() {
                onActionCompleted();
            },
        });
    };

    return (
        <>
            {!isLoading
                ? <Button
                    label={`Undeploy message type${hasMany ? 's' : ''}`}
                    startWithIcon='ArchiveRounded'
                    onClick={handleUndeployMessages}
                    disabled={!hasSelectedMessages || disable}
                />
                : <StatusIndicator label={`Undeploying message type${hasMany ? 's' : ''}...`} status='waiting' />
            }
        </>
    );
};
