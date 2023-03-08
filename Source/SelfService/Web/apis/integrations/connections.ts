// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { generateStatusErrorMessage, getBridgeServerUrlPrefix } from './api';

export type IonConfiguration = {
    gatewayUrl: string;
    username: string;
    password: string;
    clientId: string;
    clientSecret: string;
    oauthTokenUrl: string;
    byUser: string;
};

export type MdpConfiguration = {
    url: string;
    password: string;
    allowInsecureHttps: boolean;
    updatedBy: string;
};

export type ConnectionStatus = {
    name: 'Registered' | 'CloudDeployed' | 'Downloaded' | 'Unconfigured' | 'MdpConfigurationSent' | 'MdpConnected' | 'MdpConfigurationFailed' | 'IonConfigurationSent' | 'IonConnectionFailed'; //TODO: ADD MORE
    description: string;
};

export type Configuration = {
    ion: IonConfiguration,
    mdp: MdpConfiguration,
};

export type Connection = {
    name: string;
    description: string;
    id: string,
    configuration: Configuration,
    status: ConnectionStatus;
    //TODO: Add metadata
};

export async function connectionsGet(): Promise<Connection[]> {
    const url = `${getBridgeServerUrlPrefix()}/connections`;
    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });

    if (result.ok) {
        const jsonResult = await result.json();
        return jsonResult;
    } else {
        throw new Error(await generateStatusErrorMessage(result));
    }
};


