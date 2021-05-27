// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getServerUrlPrefix, _checkRedirect } from './api';
import { BusinessMoment } from './index';

export type HttpResponseBusinessMoments = {
    applicationId: string
    environment: string
    moments: HttpInputBusinessMoment[]
};

export type HttpInputBusinessMoment = {
    applicationId: string
    environment: string
    microserviceId: string
    moment: BusinessMoment
};



export async function getBusinessMoments(applicationId: string, environment: string): Promise<HttpResponseBusinessMoments> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/environment/${environment}/businessmoments`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    _checkRedirect(result);
    const jsonResult = await result.json() as HttpResponseBusinessMoments;
    return jsonResult;
}
