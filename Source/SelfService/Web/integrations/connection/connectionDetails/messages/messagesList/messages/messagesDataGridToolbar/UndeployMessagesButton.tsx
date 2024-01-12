// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { enqueueSnackbar } from 'notistack';

import { Button, StatusIndicator } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsUndeployMultiplePost } from '../../../../../../../apis/integrations/messageMappingApi.hooks';

import { ToolbarButtonProps } from './index';

export const UndeployMessagesButton = ({ connectionId, selectedMessageTypes, isDisabled, onActionExecuting, onActionCompleted }: ToolbarButtonProps) => {
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
            onError(error) {
                enqueueSnackbar(`Failed to undeploy message type: ${error}.`, { variant: 'error' });
                //TODO: Handle error return object to mark which message types failed to delete
            },
            onSuccess() {
                enqueueSnackbar(`Message type${hasMany ? 's' : ''} successfully undeployed.`);
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
                    disabled={!hasSelectedMessages || isDisabled}
                    onClick={handleUndeployMessages}
                />
                : <StatusIndicator label={`Undeploying message type${hasMany ? 's' : ''}...`} status='waiting' />
            }
        </>
    );
};
