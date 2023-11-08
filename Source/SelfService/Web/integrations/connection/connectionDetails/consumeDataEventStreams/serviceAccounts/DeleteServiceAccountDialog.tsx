// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';

import { Typography } from '@mui/material';

import { Dialog } from '@dolittle/design-system/';

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

    return (
        <Dialog
            id='delete-service-account'
            isOpen={state.open}
            title={`Delete service account${hasMany ? 's' : ''}`}
            description={`Are you sure you want to delete the selected service account${hasMany ? 's' : ''}?`}
            isLoading={state.isLoading}
            onCancel={() => dispatch({ type: 'close' })}
            confirmBtnLabel='Delete'
            confirmBtnColor='error'
            onConfirm={() => onDelete(state.serviceAccounts)}
        >
            {state.serviceAccounts.map(serviceAccount => <Typography key={serviceAccount}>{`"${serviceAccount}"`}</Typography>)}
        </Dialog>
    );
};
