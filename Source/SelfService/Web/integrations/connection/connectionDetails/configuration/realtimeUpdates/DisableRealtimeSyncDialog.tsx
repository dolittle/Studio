// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';
import { AlertDialog } from '@dolittle/design-system';
import { DialogContentText } from '@mui/material';

export type DisableWebhooksDialogState = {
    isOpen: boolean;
};

export type ACTIONTYPE =
    | { type: 'open'; payload?: void }
    | { type: 'close'; payload?: void };

export const disableWebhooksDialogReducer = (state: DisableWebhooksDialogState, action: ACTIONTYPE): DisableWebhooksDialogState => {
    switch (action.type) {
        case 'open':
            return { ...state, isOpen: true };
        case 'close':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export type DisableWebhooksDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    state: DisableWebhooksDialogState;
    onConfirm: () => void;
};

export const DisableWebhooksDialog = ({ dispatch, state, onConfirm }: DisableWebhooksDialogProps) => {

    return <AlertDialog
        id='disable-realtime-sync-service-dialog'
        title={`Disable Realtime Sync Service?`}
        description={`When disabled, data will only be updated based on the scheduled sync interval.`}
        confirmBtnText='Disable'
        confirmBtnColor='error'
        isOpen={state.isOpen}
        onConfirm={() => onConfirm()}
        onCancel={() => dispatch({ type: 'close' })}
    >
        <DialogContentText sx={{ mt: 2 }}>
            You can enable it again later if you want to without any data loss.
        </DialogContentText>
    </AlertDialog>;
};
