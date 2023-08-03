// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';
import { AlertDialog } from '@dolittle/design-system/';

export type DeleteServiceAccountDialogState = {
    open: boolean;
    connectionId: string;
    serviceAccount: string;
    isLoading: boolean;
};

export type ACTIONTYPE =
    | { type: 'open'; payload: { serviceAccount: string } }
    | { type: 'close'; payload?: void }
    | { type: 'loading'; payload: { isLoading: boolean} };

export const deleteServiceAccountDialogReducer = (state: DeleteServiceAccountDialogState, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'open':
            return { ...state, open: true, serviceAccount: action.payload.serviceAccount };
        case 'close':
            return { ...state, open: false, serviceAccount: '', isLoading: false };
        case 'loading':
            return { ...state, isLoading: action.payload.isLoading };
        default:
            return state;
    }
};

export type DeleteServiceAccountDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    state: DeleteServiceAccountDialogState;
    onDelete: (serviceAccount: string) => void;
};

export const DeleteServiceAccountDialog = ({ dispatch, state, onDelete }: DeleteServiceAccountDialogProps) => {

    return <AlertDialog
        id='delete-service-account-dialog'
        title='Delete service account'
        description='Are you sure you want to delete this service account?'
        confirmBtnText='Delete'
        confirmBtnColor='error'
        isOpen={state.open}
        onConfirm={() => onDelete(state.serviceAccount)}
        onCancel={() => dispatch({ type: 'close' })}
        isLoading={state.isLoading}
    />;
};
