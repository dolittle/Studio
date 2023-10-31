// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DialogContentText } from '@mui/material';

import { AlertDialog } from '@dolittle/design-system';

export type DisableRestApiDialogProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export const DisableRestApiDialog = ({ isOpen, onCancel, onConfirm }: DisableRestApiDialogProps) =>
    <AlertDialog
        id='disable-rest-api-service'
        isOpen={isOpen}
        title='Disable Rest API Service?'
        description='Apps or services depending on this service will no longer be able to access it.'
        confirmBtnText='Disable'
        confirmBtnColor='error'
        onConfirm={onConfirm}
        onCancel={onCancel}
    >
        <DialogContentText sx={{ mt: 2 }}>
            You can enable it again later if you want to without any data loss. Credentials will not be deleted.
        </DialogContentText>
    </AlertDialog>;
