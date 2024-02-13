// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { enqueueSnackbar } from 'notistack';

import { Button, StatusIndicator } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsDeleteMultiplePost } from '../../../../../../../apis/integrations/messageMappingApi.hooks';

import { ToolbarButtonProps } from './index';

export const DeleteMessagesButton = ({ connectionId, selectedMessageTypes, isDisabled, onActionExecuting, onActionCompleted }: ToolbarButtonProps) => {
    const deleteMultipleMutation = useConnectionsIdMessageMappingsDeleteMultiplePost();

    const isLoading = deleteMultipleMutation.isLoading;
    const hasSelectedMessages = selectedMessageTypes.length > 0;
    const hasMany = selectedMessageTypes.length > 1;

    const handleDeleteMessages = () => {
        onActionExecuting();
        deleteMultipleMutation.mutate({
            id: connectionId,
            mappingReference: selectedMessageTypes.map(messageType => ({ message: messageType.name, table: messageType.fromTable.name })),
        }, {
            onError(error) {
                enqueueSnackbar(`Failed to delete message type: ${error}.`, { variant: 'error' });
                //TODO: Handle error return object to mark which message types failed to delete
            },
            onSuccess() {
                enqueueSnackbar(`Message type${hasMany ? 's' : ''} successfully deleted.`);
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
                    label={`Delete message type${hasMany ? 's' : ''}`}
                    startWithIcon='DeleteRounded'
                    onClick={handleDeleteMessages}
                    color='error'
                    disabled={!hasSelectedMessages || isDisabled}
                />
                : <StatusIndicator label={`Deleting message type${hasMany ? 's' : ''}...`} status='waiting' />
            }
        </>
    );
};
