// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ConnectorWebhookConfigBasic, ConnectorWebhookConfigBearer } from '../apis/solutions/index';

export const makeBasicAuth = (data: ConnectorWebhookConfigBasic): string => {
    const suffix = btoa(`${data.username}:${data.password}`);
    return `Basic ${suffix}`;
};

export const makeBearer = (data: ConnectorWebhookConfigBearer): string => {
    return `Bearer ${data.token}`;
};

// getCredentialsFromBasicAuth assumes the data is in format of "Basic dXNlcjE6aGVsbG93b3JsZA==" where
// dXNlcjE6aGVsbG93b3JsZA== decoded is user1:helloworld
export const getCredentialsFromBasicAuth = (data: string): ConnectorWebhookConfigBasic => {
    if (data === '') {
        return {
            username: '',
            password: '',
        };
    }

    const dataWithoutBase64 = atob(data.split(' ')[1]);
    const rawCredentials = dataWithoutBase64.split(':');

    return {
        username: rawCredentials[0],
        password: rawCredentials[1],
    };
};
