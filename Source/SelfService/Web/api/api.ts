// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Exception } from '@dolittle/rudiments';
import { MicroserviceIngressPath } from './index';

export type ShortInfo = {
    id: string
    name: string
};

export type ShortInfoWithEnvironment = {
    id: string
    name: string
    environment: string
};

export type ContainerStatusInfo = {
    image: string
    name: string
    age: string
    state: string
    started: string
    restarts: any // How to use int?
};

export type ImageInfo = {
    image: string
    name: string
};

export type MicroserviceInfo = {
    id: string
    name: string
    kind: string
    environment: string
    images: ImageInfo[]
    ingressUrls: IngressURLWithCustomerTenantID[]
    ingressPaths: SimpleIngressPath[]
};

export type HttpResponseApplications = {
    id: string
    name: string
    applications: ShortInfoWithEnvironment[]
};

export type HttpResponseApplication = {
    id: string
    name: string
    tenantId: string
    tenantName: string
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
    containers: ContainerStatusInfo[]
};

export type HttpResponseMessage = {
    message: string
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
    automationEnabled: boolean
    tenants: string[]
    ingresses: Map<string, MicroserviceIngressPath>
};

export type LatestRuntimeInfo = {
    image: string
    changelog: string
};


export type IngressURLWithCustomerTenantID = {
    url: string
    customerTenantID: string
};

export type SimpleIngressPath = {
    path: string;
    pathType: string;
};

export type InputEnvironmentVariable = {
    name: string;
    value: string;
    isSecret: boolean;
};

export type HttpInputEnvironmentVariables = {
    data: InputEnvironmentVariable[];
};

export type HttpResponseEnvironmentVariables = {
    data: InputEnvironmentVariable[];
};

export function getServerUrlPrefix(): string {
    return '/selfservice/api';
}

export function getLatestRuntimeInfo(): LatestRuntimeInfo {
    return {
        image: 'dolittle/runtime:7.1.0',
        changelog: 'https://github.com/dolittle/Runtime/releases/tag/v7.1.0',
    };
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

export async function getApplication(applicationId: string): Promise<HttpResponseApplication> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });

    const jsonResult: HttpResponseApplication = await result.json();
    jsonResult.microservices = jsonResult.microservices || [];
    return jsonResult;
}

// getMicroservices by applicationId
export async function getMicroservices(applicationId: string): Promise<HttpResponseMicroservices> {
    // TODO {"message":"open /tmp/dolittle-k8s/508c1745-5f2a-4b4c-b7a5-2fbb1484346d/11b6cf47-5d9f-438f-8116-0d9828654657/application.json: no such file or directory"}
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

export async function deleteMicroservice(applicationId: string, environment: string, microserviceId: string): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/environment/${environment}/microservice/${microserviceId}`;
    const result = await fetch(
        url,
        {
            method: 'DELETE',
            mode: 'cors'
        });
    return result.status === 200;
}

export async function saveMicroservice(input: any): Promise<any> {
    const url = `${getServerUrlPrefix()}/microservice`;
    const response = await fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(input),
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        });

    const text = await response.text();

    if (!response.ok) {
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(text);
        } catch (error) {
            throw new Exception(`Couldn't parse the error message. The error was ${error}. Response Status ${response.status}. Response Body ${text}`);
        }
        throw new Exception(jsonResponse.message);
    }

    return JSON.parse(text);
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


export async function restartMicroservice(applicationId: string, environment: string, microserviceId: string): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment.toLowerCase()}/microservice/${microserviceId}/restart`;
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors'
    });

    return response.status === 200;
}
