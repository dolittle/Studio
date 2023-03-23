// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


export enum ConnectionConfigurationActionKind {
    NameSet = 'name-set',
    DeploymentSet = 'deployment-set',
};

export type ConnectionConfigurationAction = {
    key: ConnectionConfigurationActionKind;
    payload: unknown;
};

export type ConnectionConfigurationState = {
    deploymentType: string;
    name: string;
};


export const connectionConfigurationReducer = (state: ConnectionConfigurationState, action: ConnectionConfigurationAction) => {
    switch (action.key) {
        case ConnectionConfigurationActionKind.NameSet:
            const name = action.payload as string;
            return {
                ...state,
                name
            };
            break;
        default:
            throw Error('action not supported');
            break;
    }

    return state;
};
