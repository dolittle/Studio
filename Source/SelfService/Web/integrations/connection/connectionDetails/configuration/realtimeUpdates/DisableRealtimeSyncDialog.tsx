// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';

import { DialogContentText } from '@mui/material';

import { Dialog } from '@dolittle/design-system';

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

export const DisableWebhooksDialog = ({ dispatch, state, onConfirm }: DisableWebhooksDialogProps) =>
    <Dialog
        id='disable-realtime-sync-service'
        title='Disable Realtime Sync Service'
        isOpen={state.isOpen}
        description='When disabled, data will only be updated based on the scheduled sync interval.'
        onCancel={() => dispatch({ type: 'close' })}
        confirmBtnLabel='Disable'
        confirmBtnColor='error'
        onConfirm={() => onConfirm()}
    >
        <DialogContentText>
            You can enable it again later if you want to without any data loss.
        </DialogContentText>
    </Dialog>;
