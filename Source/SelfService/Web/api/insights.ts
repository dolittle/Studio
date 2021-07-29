// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


import { getServerUrlPrefix } from './api';
// HACK for getting testdata
//const testData = require('./testdata/insights-runtime-v1.json');

export async function getRuntimeV1(applicationId: string, environment: string): Promise<any> {
    //return testData as any;
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment.toLowerCase()}/insights/runtime-v1`;
    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult: any = await result.json();

    return jsonResult;
}
