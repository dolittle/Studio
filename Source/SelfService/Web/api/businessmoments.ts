// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getServerUrlPrefix, _checkRedirect } from './api';

export async function getBusinessMoments(applicationId: string, environment: string): Promise<any> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/environment/${environment}/businessmoments`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    _checkRedirect(result);
    const jsonResult = await result.json();
    return jsonResult;
}
