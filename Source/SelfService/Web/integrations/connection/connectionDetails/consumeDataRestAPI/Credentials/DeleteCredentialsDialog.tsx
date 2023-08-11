// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';
import { AlertDialog } from '@dolittle/design-system/';
import { Box, Typography } from '@mui/material';

export type DeleteCredentialsDialogState = {
    open: boolean;
    connectionId: string;
    credentials: string[];
    isLoading: boolean;
};

export type ACTIONTYPE =
    | { type: 'open'; payload: { credentials: string[] } }
    | { type: 'close'; payload?: void }
    | { type: 'loading'; payload: { isLoading: boolean } };

export const deleteCredentialsDialogReducer = (state: DeleteCredentialsDialogState, action: ACTIONTYPE): DeleteCredentialsDialogState => {
    switch (action.type) {
        case 'open':
            return { ...state, open: true, credentials: action.payload.credentials };
        case 'close':
            return { ...state, open: false, credentials: [], isLoading: false };
        case 'loading':
            return { ...state, isLoading: action.payload.isLoading };
        default:
            return state;
    }
};

export type DeleteCredentialsDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    state: DeleteCredentialsDialogState;
    onDelete: (serviceAccounts: string[]) => void;
};

export const DeleteCredentialsDialog = ({ dispatch, state, onDelete }: DeleteCredentialsDialogProps) => {

    const hasMany = state.credentials.length > 1;

    return <AlertDialog
        id='delete-credentials-dialog'
        title={`Delete credential${hasMany ? 's' : ''}`}
        description={`Are you sure you want to delete the selected credential${hasMany ? 's' : ''}? This action cannot be undone and will impact any applications currently using these credentials.`}
        confirmBtnText='Delete'
        confirmBtnColor='error'
        isOpen={state.open}
        onConfirm={() => onDelete(state.credentials)}
        onCancel={() => dispatch({ type: 'close' })}
        isLoading={state.isLoading}
    >
        <Box marginTop={2}>
            {state.credentials.map((serviceAccount) => <Typography key={serviceAccount}>{`"${serviceAccount}"`}</Typography>)}
        </Box>
    </AlertDialog>;
};
