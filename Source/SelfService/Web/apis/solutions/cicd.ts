// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { getServerUrlPrefix } from './api';

// https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
export type KubernetesContainerRegistryCredentials = {
    '.dockerconfigjson': string;
};

// https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
export type KubernetesServiceAccountCredentials = {
    'ca.crt': string;
    'namespace': string;
    'token': string;
};

// @throws {Error}
export async function getAzureDevopsKubernetesServiceAccount(applicationId: string): Promise<KubernetesServiceAccountCredentials> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/cicd/credentials/service-account/devops`;

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
    });

    if (response.status !== 200) {
        console.error(response);
        throw Error('Failed to get azure-devops service account');
    }

    const data = await response.json();
    return data;
}

// @throws {Error}
export async function getContainerRegistry(applicationId: string): Promise<KubernetesContainerRegistryCredentials> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/cicd/credentials/container-registry`;

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
    });

    if (response.status !== 200) {
        console.error(response);
        throw Error('Failed to get container registry');
    }

    const data = await response.json();
    return data;
}

