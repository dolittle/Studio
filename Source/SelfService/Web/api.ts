// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceDolittle, MicroserviceSimple, MicroserviceBusinessMomentAdaptor } from './store';

export type ShortInfo = {
    id: string
    name: string
};

export type ShortInfoWithEnvironment = {
    id: string
    name: string
    environment: string
};

export type ImageInfo = {
    image: string
    name: string
};

export type MicroserviceInfo = {
    id: string
    name: string
    environment: string
    images: ImageInfo[]
};

export type HttpResponseApplications = {
    id: string
    name: string
    applications: ShortInfo[]
};

export type HttpResponseApplications2 = { // Not a great name
    id: string
    name: string
    tenantId: string
    applications: ShortInfo[]
    environments: HttpInputApplicationEnvironment[]
    microservices: any[] // Not great
};

export type HttpResponseMicroservices = {
    application: ShortInfo
    microservices: MicroserviceInfo[]
};

export type PodInfo = {
    name: string
    phase: string
    containers: ImageInfo[]
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

export type HttpInputApplicationEnvironment = {
    applicationId: string
    tenantId: string
    name: string
    domainPrefix: string
    host: string
};

function getServerUrlPrefix(): string {
    return '/_/selfservice/api';
}

export async function getLiveApplications(): Promise<any> {
    const url = `${getServerUrlPrefix()}/live/applications`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult = await result.json();

    return jsonResult;
}

export async function getApplications(): Promise<any> {
    const url = `${getServerUrlPrefix()}/applications`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult = await result.json();

    return jsonResult;
}

export async function getApplication(applicationId: string): Promise<HttpResponseApplications2> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult: HttpResponseApplications2 = await result.json();

    return jsonResult;
}

// TODO get environments, not easy to know

// getMicroservices by applicationId
export async function getMicroservices(applicationId: string): Promise<HttpResponseMicroservices> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/microservices`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult: HttpResponseMicroservices = await result.json();

    return jsonResult;
}

export async function saveMicroservice(input: any): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/microservice`;
    const result = await fetch(
        url,
        {
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

export async function saveSimpleMicroservice(input: MicroserviceSimple): Promise<boolean> {
    return saveMicroservice(input);
}

export async function saveBusinessMomentsAdaptorMicroservice(input: MicroserviceBusinessMomentAdaptor): Promise<boolean> {
    return saveMicroservice(input);
}


export async function getPodStatus(applicationId: string, environment: string, microserviceId: string): Promise<HttpResponsePodStatus> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment.toLowerCase()}/microservice/${microserviceId}/podstatus`;
    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult: HttpResponsePodStatus = await result.json();

    return jsonResult;
}

export async function getPodLogs(applicationId: string, podName: string, containerName: string): Promise<HttpResponsePodLog> {
    let url = `${getServerUrlPrefix()}/live/application/${applicationId}/pod/${podName}/logs`;

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


export async function saveEnvironment(input: HttpInputApplicationEnvironment): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/environment`;
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
    const jsonResult = await result.json();
    console.log(jsonResult);
    console.log(result.status);
    return true;
}
