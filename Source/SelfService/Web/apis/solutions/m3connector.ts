// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getServerUrlPrefix } from './api';

export type M3ConnectorData = {
    accessKey: string
    ca: string
    certificate: string
    config: M3ConnectorDataConfig
};

export type M3ConnectorDataConfig = {
    brokerUrl: string
    topics: string[]
};


export async function getData(applicationId: string, environment: string): Promise<M3ConnectorData> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/configmap/${environment.toLocaleLowerCase()}-kafka-files`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult = await result.json() as any;

    const data = jsonResult.data ?? {};
    const configDataStr = data['config.json'] ?? '';
    let configData = {
        brokerUrl: '',
        topics: [] as string[]
    };

    try {
        configData = JSON.parse(configDataStr);
    } catch (e) {
        // do nothing
    }


    return {
        accessKey: data['accessKey.pem'] ?? '',
        ca: data['ca.pem'] ?? '',
        certificate: data['certificate.pem'] ?? '',
        config: configData,
    } as M3ConnectorData;
}
