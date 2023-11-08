// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch } from 'react';

import { Dialog } from '@dolittle/design-system';

export type DeleteConnectorDialogState = {
    open: boolean;
    connectionId: string;
    connectorName: string;
    isLoading: boolean;
};

export type ActionTypeOpenPayload = {
    connectionId: string;
    connectorName: string;
};

export type ActionTypeIsLoadingPayload = boolean;

export type ACTIONTYPE =
    | { type: 'open'; payload: ActionTypeOpenPayload }
    | { type: 'close'; payload?: void }
    | { type: 'isLoading'; payload: ActionTypeIsLoadingPayload };

export const deleteConnectorDialogReducer = (state: DeleteConnectorDialogState, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'open':
            return {
                ...state,
                open: true,
                connectionId: action.payload.connectionId,
                connectorName: action.payload.connectorName,
                isLoading: false,
            };
        case 'close':
            return {
                ...state,
                open: false,
                connectionId: '',
                connectorName: '',
                isLoading: false,
            };
        case 'isLoading':
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

export type DeleteConnectorDialogProps = {
    dispatch: Dispatch<ACTIONTYPE>;
    dialogState: DeleteConnectorDialogState;
    handleDelete: () => void;
};

export const DeleteConnectorDialog = ({ dialogState, dispatch, handleDelete }: DeleteConnectorDialogProps) =>
    <Dialog
        id='delete-connector'
        title={`Delete connector - '${dialogState.connectorName}'`}
        isOpen={dialogState.open}
        description='All associated message types will be removed. Click delete if you would like to delete the connection and all associated message types.'
        onCancel={() => dispatch({ type: 'close' })}
        confirmBtnLabel='Delete'
        confirmBtnColor='error'
        onConfirm={() => handleDelete()}
    />;
