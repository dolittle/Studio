// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';
import { AlertDialog } from '@dolittle/design-system/';
import { Box, Typography } from '@mui/material';

export type DeleteServiceAccountDialogState = {
    open: boolean;
    connectionId: string;
    serviceAccounts: string[];
    isLoading: boolean;
};

export type ACTIONTYPE =
    | { type: 'open'; payload: { serviceAccounts: string[] } }
    | { type: 'close'; payload?: void }
    | { type: 'loading'; payload: { isLoading: boolean } };

export const deleteServiceAccountDialogReducer = (state: DeleteServiceAccountDialogState, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'open':
            return { ...state, open: true, serviceAccounts: action.payload.serviceAccounts };
        case 'close':
            return { ...state, open: false, serviceAccounts: [], isLoading: false };
        case 'loading':
            return { ...state, isLoading: action.payload.isLoading };
        default:
            return state;
    }
};

export type DeleteServiceAccountDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    state: DeleteServiceAccountDialogState;
    onDelete: (serviceAccounts: string[]) => void;
};

export const DeleteServiceAccountDialog = ({ dispatch, state, onDelete }: DeleteServiceAccountDialogProps) => {

    const hasMany = state.serviceAccounts.length > 1;

    return <AlertDialog
        id='delete-service-account-dialog'
        title={`Delete service account${hasMany ? 's' : ''}`}
        description={`Are you sure you want to delete the selected service account${hasMany ? 's' : ''}?`}
        confirmBtnText='Delete'
        confirmBtnColor='error'
        isOpen={state.open}
        onConfirm={() => onDelete(state.serviceAccounts)}
        onCancel={() => dispatch({ type: 'close' })}
        isLoading={state.isLoading}
    >
        <Box marginTop={2}>
            {state.serviceAccounts.map((serviceAccount) => <Typography key={serviceAccount}>{`"${serviceAccount}"`}</Typography>)}
        </Box>
    </AlertDialog>;
};
