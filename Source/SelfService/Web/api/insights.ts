// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


import { getServerUrlPrefix } from './api';
// HACK for getting testdata
//const testData = require('./testdata/insights-runtime-v1.json');

export async function getRuntimeV1(applicationId: string, environment: string): Promise<any> {
    //return testData as any;
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment.toLowerCase()}/insights/runtime-v1`;
    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });

    if (!response.ok) {
        console.error(response);
        throw Error('Failed to get runtime stats');
    }
    const jsonResult: any = await response.json();

    return jsonResult;
}
