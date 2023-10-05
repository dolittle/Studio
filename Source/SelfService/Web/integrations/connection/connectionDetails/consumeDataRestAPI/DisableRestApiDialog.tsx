// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';
import { AlertDialog } from '@dolittle/design-system';
import { DialogContentText } from '@mui/material';


export type DisableRestApiDialogState = {
    isOpen: boolean;
};

export type ACTIONTYPE =
    | { type: 'open'; payload?: void }
    | { type: 'close'; payload?: void };

export const disableRestApiDialogReducer = (state: DisableRestApiDialogState, action: ACTIONTYPE): DisableRestApiDialogState => {
    switch (action.type) {
        case 'open':
            return { ...state, isOpen: true };
        case 'close':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export type DisableRestApiDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    state: DisableRestApiDialogState;
    onConfirm: () => void;
};

export const DisableRestApiDialog = ({ dispatch, state, onConfirm }: DisableRestApiDialogProps) => {

    return <AlertDialog
        id='disable-rest-api-service-dialog'
        title={`Disable Rest API Service?`}
        description={`Apps or services depending on this service will no longer be able to access it.`}
        confirmBtnText='Disable'
        confirmBtnColor='error'
        isOpen={state.isOpen}
        onConfirm={() => onConfirm()}
        onCancel={() => dispatch({ type: 'close' })}
    >
        {/* <DialogContentText sx={{ mt: 2 }}>
            Apps or services depending on this service will no longer be able to access it.
        </DialogContentText> */}

        <DialogContentText sx={{ mt: 2 }}>
            You can enable it again later if you want to without any data loss. Credentials will not be deleted.
        </DialogContentText>
    </AlertDialog>;
};
