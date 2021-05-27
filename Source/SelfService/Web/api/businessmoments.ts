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

export async function deleteBusinessmoment(applicationId: string, environment: string, microserviceId: string, momentId: string): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/environment/${environment}/businessmoments/microservice/${microserviceId}/moment/${momentId}`;
    const result = await fetch(
        url,
        {
            method: 'DELETE',
            mode: 'cors'
        });
    return result.status === 200;
}

export async function saveBusinessmoment(input: HttpInputBusinessMoment): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/businessmoment`;
    const result = await fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(input),
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        });
    _checkRedirect(result);
    return result.status === 200;
}
