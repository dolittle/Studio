// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch, Fragment } from 'react';

import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { Divider, List, ListItem } from '@mui/material';

import { AlertDialog } from '@dolittle/design-system';

export type DeleteCredentialDialogState = {
    open: boolean;
    connectionId: string;
    credentialName: string;
};

export type ACTIONTYPE =
    | { type: 'open'; payload?: void }
    | { type: 'close'; payload?: void }
    | { type: 'setCredential'; payload: string }
    | { type: 'clearCredential'; payload?: void }
    | { type: 'setLoading'; payload: boolean };

export const deleteCredentialDialogReducer = (state: DeleteCredentialDialogState, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'open':
            return { ...state, open: true };
        case 'close':
            return { ...state, open: false };
        case 'setCredential':
            //TODO: The credential payload should be part of the 'open' action.
            return { ...state, credentialName: action.payload };
        case 'clearCredential':
            //TODO: The clearing of credential should be part of the close action.
            return { ...state, credentialName: '' };
        default:
            return state;
    }
};

export type DeleteCredentialDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    dialogState: DeleteCredentialDialogState;
    handleDelete: (credentialName: string) => void;
};

export const DeleteCredentialDialog = ({dialogState, dispatch, handleDelete }: DeleteCredentialDialogProps) => {

    const handleCancel = () => {
        dispatch({ type: 'clearCredential' });
        dispatch({ type: 'close' });
    };

    return (
        <AlertDialog
            id='delete-credential'
            title={`Delete credentials - '${dialogState.credentialName}'`}
            description={`
                Are you sure you want to delete the credentials for '${dialogState.credentialName}'?
                This action cannot be undone and will impact any applications currently using these credentials.
            `}
            confirmBtnColor='error'
            confirmBtnText='Delete'
            isOpen={dialogState.open}
            onCancel={handleCancel}
            onConfirm={() => handleDelete(dialogState.credentialName)}
        />
    );
};
