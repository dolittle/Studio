// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Button, StatusIndicator } from '@dolittle/design-system';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { CACHE_KEYS } from '../../../../../../apis/integrations/CacheKeys';
import { useConnectionsIdMessageMappingsTablesTableMessagesMessageDeployPost } from '../../../../../../apis/integrations/messageMappingApi.hooks';
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

    const [numberOfRequests, setNumberOfRequests] = useState(0);
    const [numberOfErrors, setNumberOfErrors] = useState(0);
    const [batchSending, setBatchSending] = useState(false);
    const hasSelectedMessages = selectedMessageTypes.length > 0;
    const hasMany = selectedMessageTypes.length > 1;
    const isLoading = numberOfRequests > 0;
    const queryClient = useQueryClient();

    const deployMutation = useConnectionsIdMessageMappingsTablesTableMessagesMessageDeployPost({
        onError: (error, variables, context) => {
            // console.log('onError', variables);
            setNumberOfErrors((oldNumber) => oldNumber + 1);
            enqueueSnackbar(`Failed to deploy message type: ${variables.message}`, { variant: 'error' });
        },

        onSuccess: (data, variables, context) => {
            // console.log('onSuccess', data, variables);
        },

        onSettled: (data, error, variables, context) => {
            // console.log('onSettled',variables);
            setNumberOfRequests((oldNumber) => oldNumber - 1);
        },
    });


    const handleDeployMessages = () => {
        onActionExecuting();
        setBatchSending(true);
        setNumberOfRequests(selectedMessageTypes.length);
        selectedMessageTypes.forEach((messageType) => deployMutation.mutate({
            id: connectionId,
            table: messageType.fromTable?.name!,
            message: messageType.name!,
        }));
    };

    useEffect(() => {
        if (batchSending && numberOfRequests === 0) {
            if(numberOfErrors === 0) {
                enqueueSnackbar(`Message types${hasMany ? 's' : ''} successfully deployed`, { variant: 'success' });
            }
            setBatchSending(false);
            setNumberOfErrors(0);
            onSuccess();
            queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ConnectionMessageMappings_GET, connectionId] });
        };
    }, [numberOfRequests, batchSending, numberOfErrors]);



    return (
        <>
            {!isLoading
                ? <Button
                    label={`Deploy message types${hasMany ? 's' : ''}...`}
                    startWithIcon='RocketLaunch'
                    onClick={handleDeployMessages}
                    disabled={!hasSelectedMessages|| disable}
                />
                : <StatusIndicator
                    label={`Deploying message type${hasMany ? 's' : ''}...`}
                    status='waiting'
                />}
        </>
    );
};
