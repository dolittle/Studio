// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { getServerUrlPrefix } from './api';

// @throws {Error}
export async function getKubernetesServiceAccount(applicationId: string): Promise<any> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/cicd/credentials/service-account`;

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
    });

    if (response.status !== 200) {
        console.error(response);
        throw Error('Failed to service account');
    }

    return await response.json() as any;
}

// @throws {Error}
export async function getContainerRegistry(applicationId: string): Promise<any> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/cicd/credentials/container-registry`;

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
    });

    if (response.status !== 200) {
        console.error(response);
        throw Error('Failed to service account');
    }

    return await response.json() as any;
}

