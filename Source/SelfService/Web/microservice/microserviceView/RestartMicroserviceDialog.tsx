// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { ConfirmDialog } from '@dolittle/design-system/atoms/ConfirmDialog/ConfirmDialog';

import { restartMicroservice } from '../../api/api';

type MicroserviceRestartProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    handleSuccess?: (successResult: boolean) => void;
};

export const RestartMicroserviceDialog = ({ applicationId, environment, microserviceId, open, setOpen, handleSuccess }: MicroserviceRestartProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const restart = async () => {
        await restartMicroservice(applicationId, environment, microserviceId)
            .then(() => {
                enqueueSnackbar('Microservice restarted successfully', { variant: 'success' });
                handleSuccess?.(true);
            })
            .catch(() => {
                enqueueSnackbar('Failed to restart microservice', { variant: 'error' });
                handleSuccess?.(false);
            });

        setOpen(false);
    };

    return (
        <ConfirmDialog
            id='restart-microservice-dialog'
            open={open}
            title='Restart microservice?'
            description='This action cannot be undone. Click restart if you would like to restart the mircroservice.'
            cancelText='Cancel'
            confirmText='Restart'
            handleCancel={() => setOpen(false)}
            handleConfirm={() => restart()}
        />
    );
};
