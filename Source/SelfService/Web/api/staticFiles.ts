// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { getServerUrlPrefix } from './api';


export type StaticFiles = {
    files: string[]
};

// @throws {Error}
export async function getFiles(applicationId: string, environment: string, microserviceId: string): Promise<StaticFiles> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/environment/${environment.toLowerCase()}/staticFiles/${microserviceId}/list`;

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
    });

    if (response.status !== 200) {
        console.error(response);
        throw Error('Failed to get files');
    }

    return await response.json() as StaticFiles;
}

// @throws {Error}
export async function addFile(applicationId: string, environment: string, microserviceId: string, fileName: string, file: File): Promise<void> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/environment/${environment.toLowerCase()}/staticFiles/${microserviceId}/add/${fileName}`;
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: file,
    });

    if (response.status !== 201) {
        console.error(response);
        throw Error('Failed to add file');
    }
}

// deleteFile based on the filename that can be found via getFiles
// @throws {Error}
export async function deleteFile(applicationId: string, environment: string, microserviceId: string, fileName: string): Promise<void> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/environment/${environment.toLowerCase()}/staticFiles/${microserviceId}/remove/${fileName}`;
    // TODO add file
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
    });


    if (response.status !== 200) {
        console.error(response);
        throw Error('Failed to delete');
    }
}
