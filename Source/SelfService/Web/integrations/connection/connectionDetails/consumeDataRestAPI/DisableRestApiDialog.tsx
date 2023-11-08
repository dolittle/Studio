// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { DialogContentText } from '@mui/material';

import { Dialog } from '@dolittle/design-system';

import { useConnectionsIdRestApiDisablePost } from '../../../../apis/integrations/connectionRestApiApi.hooks';
import { CACHE_KEYS } from '../../../../apis/integrations/CacheKeys';

import { useConnectionIdFromRoute } from '../../../routes.hooks';

export type DisableRestApiDialogProps = {
    isOpen: boolean;
    onCancel: () => void;
};

export const DisableRestApiDialog = ({ isOpen, onCancel }: DisableRestApiDialogProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const connectionId = useConnectionIdFromRoute();
    const queryClient = useQueryClient();
    const disableMutation = useConnectionsIdRestApiDisablePost();

    const handleDisableRestApi = () => {
        onCancel();

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
        <Dialog
            id='disable-rest-api-service'
            isOpen={isOpen}
            title='Disable Rest API Service'
            description='Apps or services depending on this service will no longer be able to access it.'
            onCancel={onCancel}
            confirmBtnLabel='Disable'
            confirmBtnColor='error'
            onConfirm={handleDisableRestApi}
        >
            <DialogContentText>
                You can enable it again later if you want to without any data loss. Credentials will not be deleted.
            </DialogContentText>
        </Dialog>
    );
};
