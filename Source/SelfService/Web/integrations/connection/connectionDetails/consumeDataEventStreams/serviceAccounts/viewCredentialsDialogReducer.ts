// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


export type ViewCredentialsDialogState = {
    isOpen: boolean;
    connectionId: string;
    serviceAccountName?: string;
};

export type ACTIONTYPE =
    | { type: 'open'; payload: { serviceAccountName: string } }
    | { type: 'close'; payload?: void }
    | { type: 'setLoading'; payload: boolean };

export const viewCredentialsDialogReducer = (state: ViewCredentialsDialogState, action: ACTIONTYPE) => {
    switch (action.type) {
        case 'open':
            return { ...state, isOpen: true, serviceAccountName: action.payload.serviceAccountName };
        case 'close':
            return { ...state, isOpen: false, serviceAccountName: undefined };
        default:
            return state;
    }
};
