// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


export type ShortInfo = {
    id: string
    name: string
};

export type ShortInfoWithEnvironment = {
    id: string
    name: string
    environment: string
};

export type HttpResponseApplications = {
    id: string
    name: string
    applications: ShortInfo[]
};

export type HttpResponseMicroservices = {
    application: ShortInfo
    microservices: ShortInfoWithEnvironment[]
};


export async function getApplications(tenantId: string): Promise<any> {
    const uri = `/live/tenant/${tenantId}/applications`;
    const url = `http://localhost:8080${uri}`;

    const result = await fetch(url, {
        method: 'GET',
        mode: 'cors'
    });
    const jsonResult = await result.json();

    return jsonResult;
}

export async function getMicroservices(applicationId: string): Promise<HttpResponseMicroservices> {
    const uri = `/live/application/${applicationId}/microservices`;
    const url = `http://localhost:8080${uri}`;

    const result = await fetch(url, {
        method: 'GET',
        mode: 'cors'
    });
    const jsonResult: HttpResponseMicroservices = await result.json();

    return jsonResult;
}
