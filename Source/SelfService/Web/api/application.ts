// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getServerUrlPrefix } from './api';
export async function getPersonalisedInfo(applicationId: string): Promise<any> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/personalised-application-info`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult = await result.json() as any;
    return jsonResult;
}
