// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceDolittle, MicroserviceSimple } from './store';


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

export type PodInfo = {
    name: string
    phase: string
};

export type HttpResponsePodStatus = {
    namespace: string
    microservice: ShortInfo
    pods: PodInfo[]
};

export type HttpResponsePodLog = {
    applicationId: string
    podName: string
    logs: string
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

export async function saveSimpleMicroservice(input: MicroserviceSimple): Promise<boolean> {
    const result = await fetch('http://localhost:8080/microservice', {
        method: 'POST',
        body: JSON.stringify(input),
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
            'x-tenant': (input.dolittle as MicroserviceDolittle).tenantId // TODO this is not correct
        }
    });
    const jsonResult = await result.json();
    console.log(jsonResult);
    return true;
}

export async function getPodStatus(applicationId: string, environment: string, microserviceId: string): Promise<HttpResponsePodStatus> {
    const uri = `/live/application/${applicationId}/microservices/${microserviceId}/podstatus/${environment}`;
    const url = `http://localhost:8080${uri}`;

    const result = await fetch(url, {
        method: 'GET',
        mode: 'cors'
    });
    const jsonResult: HttpResponsePodStatus = await result.json();

    return jsonResult;
}

export async function getPodLogs(applicationId: string, podName: string, containerName: string): Promise<HttpResponsePodLog> {
    const uri = `/live/application/${applicationId}/pod/${podName}/logs`;
    let url = `http://localhost:8080${uri}`;

    if (containerName !== '') {
        url = `${url}?containerName=${containerName}`;
    }

    const result = await fetch(url, {
        method: 'GET',
        mode: 'cors'
    });
    const jsonResult: HttpResponsePodLog = await result.json();

    return jsonResult;
}
