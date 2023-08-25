// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Exception } from '@dolittle/rudiments';

export type JobInfo = {
    jobId: string;
};

export type ShortInfo = {
    id: string;
    name: string;
};

export type ShortInfoWithEnvironment = {
    id: string;
    name: string;
    environment: string;
};

export type ContainerStatusInfo = {
    image: string;
    name: string;
    age: string;
    state: string;
    started: string;
    restarts: number;
};

export type ImageInfo = {
    image: string;
    name: string;
};

export type MicroserviceExtra = {
    extra?: {
        ingress: SimpleIngressPath;
        headPort: number;
        isPublic: boolean;
        headImage: string;
        runtimeImage: string;
        headCommand: string;
        connections: any;
    };
};

export type MicroserviceObject = {
    id: string;
    name: string;
    kind: string;
    environment: string;
    live: MicroserviceInfo;
    edit: MicroserviceExtra;
};

export type MicroserviceInfo = {
    id: string;
    name: string;
    kind: string;
    environment: string;
    images: ImageInfo[];
    ingressUrls: IngressURLWithCustomerTenantID[];
    ingressPaths: SimpleIngressPath[];
};

export type HttpResponseMicroservices = {
    application: ShortInfo;
    microservices: MicroserviceInfo[];
};

export type PodInfo = {
    name: string;
    phase: string;
    containers: ContainerStatusInfo[];
};

export type HttpResponseMessage = {
    message: string;
};

export type HttpResponsePodStatus = {
    namespace: string;
    microservice: ShortInfo;
    pods: PodInfo[];
};

export type HttpResponsePodLog = {
    applicationId: string;
    podName: string;
    logs: string;
};

export type LatestRuntimeInfo = {
    image: string;
    changelog: string;
};

export type IngressURLWithCustomerTenantID = {
    url: string;
    customerTenantID: string;
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

export type HttpResponseConfigFilesNamesList = {
    data: string[];
};

export type InputConfigFile = {
    name: string;
    value: string;
};

export type HttpInputDeleteConfigFile = {
    key: string;
};

export type UpdateConfigFiles = {
    success: boolean;
    error?: string;
};

export function getServerUrlPrefix(): string {
    return '/selfservice/api';
};

export function getLatestRuntimeInfo(): LatestRuntimeInfo {
    return {
        image: 'dolittle/runtime:9.0.1',
        changelog: 'https://github.com/dolittle/Runtime/releases/tag/v8.9.1',
    };
};

export function getRuntimes(): LatestRuntimeInfo[] {
    return [
        getLatestRuntimeInfo(),
        {
            image: 'dolittle/runtime:8.9.4',
            changelog: 'https://github.com/dolittle/Runtime/releases/tag/v8.9.4',
        },
        {
            image: 'dolittle/runtime:6.2.4',
            changelog: 'https://github.com/dolittle/Runtime/releases/tag/v6.2.4',
        }
    ];
};

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
};

export async function deleteMicroservice(applicationId: string, environment: string, microserviceId: string): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/environment/${environment}/microservice/${microserviceId}`;

    const result = await fetch(
        url,
        {
            method: 'DELETE',
            mode: 'cors'
        });

    return result.status === 200;
};

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
    };

    return JSON.parse(text);
};

export async function restartMicroservice(applicationId: string, environment: string, microserviceId: string): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment.toLowerCase()}/microservice/${microserviceId}/restart`;

    const response = await fetch(
        url,
        {
            method: 'DELETE',
            mode: 'cors'
        });

    return response.status === 200;
};

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
};

export async function getPodLogs(applicationId: string, podName: string, containerName: string): Promise<HttpResponsePodLog> {
    let url = `${getServerUrlPrefix()}/live/application/${applicationId}/pod/${podName}/logs`;

    if (containerName !== '') {
        url = `${url}?containerName=${containerName}`;
    };

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });

    const jsonResult: HttpResponsePodLog = await result.json();

    return jsonResult;
};

export async function getEnvironmentVariables(applicationId: string, environment: string, microserviceId: string): Promise<HttpResponseEnvironmentVariables> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment}/microservice/${microserviceId}/environment-variables`;

    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });

    const data = await response.json();

    return data;
};

export async function updateEnvironmentVariables(applicationId: string, environment: string, microserviceId: string, input: InputEnvironmentVariable[]): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment}/microservice/${microserviceId}/environment-variables`;

    const data = {
        data: input
    } as HttpInputEnvironmentVariables;

    const response = await fetch(
        url,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        });

    return response.status === 200;
};

export async function getConfigFilesNamesList(applicationId: string, environment: string, microserviceId: string): Promise<HttpResponseConfigFilesNamesList> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment}/microservice/${microserviceId}/config-files/list`;

    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
        });

    const data: HttpResponseConfigFilesNamesList = await response.json();

    return data;
};

export async function updateConfigFile(applicationId: string, environment: string, microserviceId: string, form: FormData): Promise<UpdateConfigFiles> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment}/microservice/${microserviceId}/config-files`;

    const response = await fetch(
        url,
        {
            method: 'PUT',
            body: form,
            mode: 'cors',
        });

    const parsedResponse = await response.json();

    return response.status === 200 ? { success: true } : { success: false, error: parsedResponse.message };
};


export async function deleteConfigFile(applicationId: string, environment: string, microserviceId: string, fileName: string): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/live/application/${applicationId}/environment/${environment}/microservice/${microserviceId}/config-files`;

    const data = {
        key: fileName
    } as HttpInputDeleteConfigFile;

    const response = await fetch(
        url,
        {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(data)
        });

    return response.status === 200;
};

export async function parseJSONResponse(response: any): Promise<any> {
    const text = await response.text();

    if (!response.ok) {
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(text);
        } catch (error) {
            throw Error(`Couldn't parse the error message. The error was ${error}. Response Status ${response.status}. Response Body ${text}`);
        }
        throw Error(jsonResponse.message);
    };

    const data = JSON.parse(text);

    return data;
};
