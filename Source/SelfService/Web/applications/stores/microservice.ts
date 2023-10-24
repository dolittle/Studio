// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { get, writable } from 'use-svelte-store';

import { MicroserviceDolittle, MicroserviceSimple } from '../../apis/solutions/index';
import {
    deleteMicroservice,
    editMicroservice,
    getMicroservices, getMicroservicesWithPods,
    HttpResponseMicroservices, HttpResponseMicroservicesWithPods,
    InputEditMicroservice,
    MicroserviceInfo,
    MicroserviceInfoWithPods, MicroserviceObject,
    saveMicroservice
} from '../../apis/solutions/api';
import {
    getApplication,
    HttpResponseApplication,
    HttpInputApplicationEnvironment
} from '../../apis/solutions/application';
import { getRuntimeNumberFromString } from '../../utils/helpers';


const data = {
    microservices: [] as MicroserviceInfoWithPods[],
    isLoaded: false
};

function trimDefaultRegistry(img: string): string {
    if (img.startsWith('docker.io/')) {
        return img.substring(10);
    } else {
        return img;
    }
}

function getRuntimeVersion(image?: string){
    if(image == null || image.length === 0 || image === 'N/A') return 'N/A';
    const trimmed = trimDefaultRegistry(image);
    return getRuntimeNumberFromString(trimmed);
}

// We do not use the same information from view to edit.
export const microservices = writable(data.microservices);
export const isLoaded = writable(data.isLoaded);

export const loadMicroservices = (applicationId: string) => {
    Promise.all([getApplication(applicationId), getMicroservices(applicationId)])
        .then(values => {
            const applicationData = values[0];
            mergeMicroservicesFromGit(applicationData.microservices);

            const microservicesData = values[1] as HttpResponseMicroservicesWithPods;
            mergeMicroservicesFromK8s(microservicesData.microservices);

            isLoaded.set(true);
        });
};

export const mergeMicroservicesFromGit = (items: MicroserviceSimple[]) => {
    let data = get(microservices);

    items.forEach(element => {
        const storeItem: MicroserviceObject = {
            id: (element.dolittle as MicroserviceDolittle).microserviceId,
            name: element.name,
            kind: element.kind,
            environment: element.environment,
            edit: element,
            live: {
                id: '',
                name: '',
                kind: '',
                environment: '',
                images: [],
                ingressUrls: [],
                ingressPaths: [],
                pods: [],
                phase: ''
            } as MicroserviceInfoWithPods,
            head: trimDefaultRegistry(element.extra.headImage),
            runtime: getRuntimeVersion(element.extra.runtimeImage || 'N/A')
        };

        const index = data.findIndex(item => item.id === storeItem.id && item.environment === storeItem.environment);

        if (-1 === index) {
            data = [...data, storeItem];
            return;
        }

        // Use live from the data structure
        storeItem.live = data[index].live;
        data = [...data.slice(0, index), storeItem, ...data.slice(index + 1)];
    });

    microservices.set(data);
};

export const mergeMicroservicesFromK8s = (items: MicroserviceInfoWithPods[]) => {
    let data = get(microservices);


    items.forEach(element => {
        const storeItem: MicroserviceObject = {
            id: element.id,
            name: element.name,
            kind: '', // TODO life would be so much simpler if we knew what this was, maybe adding the label for it.
            environment: element.environment,
            edit: {} as any,
            live: element,
            head: trimDefaultRegistry(element.images.find(img => img.name === 'head')?.image || 'N/A'),
            runtime: getRuntimeVersion(element.images.find(img => img.name === 'runtime')?.image || 'N/A')
        };


        const index = data.findIndex(item => item.id === storeItem.id && item.environment === storeItem.environment);

        if (-1 === index) {
            data = [...data, storeItem];
            return;
        }

        // Use live from the data structure
        storeItem.edit = data[index].edit;
        storeItem.kind = storeItem.edit.kind ? storeItem.edit.kind : '';
        data = [...data.slice(0, index), storeItem, ...data.slice(index + 1)];
    });

    microservices.set(data);
};

const saveMicroserviceWithStore = async (kind: string, input: MicroserviceSimple, application: HttpResponseApplication): Promise<boolean> => {
    let response: boolean;

    switch (kind) {
        case 'simple':
            response = await saveMicroservice(input);
            break;
        default:
            alert(`Saving via store failed. Kind: ${kind} not supported.`);
            return false;
    }

    if (!response) return response;

    mergeMicroservicesFromGit(application.microservices);
    const liveMicroservices = await getMicroservicesWithPods(application.id);
    mergeMicroservicesFromK8s(liveMicroservices.microservices);

    return response;
};

export const saveSimpleMicroserviceWithStore = (input: MicroserviceSimple, application: HttpResponseApplication) =>
    saveMicroserviceWithStore(input.kind, input, application);

export const canEditMicroservices = (environments: HttpInputApplicationEnvironment[], environment: string): boolean =>
    environments.some(info => info.name === environment && info.automationEnabled);

export const findCurrentMicroservice = (microserviceId: string): MicroserviceObject => {
    const data = get(microservices);
    return data.find(ms => ms.id === microserviceId);
};

export const canEditMicroservice = (environments: HttpInputApplicationEnvironment[], environment: string, microserviceId: string): boolean => {
    if (!canDeleteMicroservice(environments, environment, microserviceId)) return false;

    const currentMicroservice: MicroserviceObject = findCurrentMicroservice(microserviceId);
    if (!currentMicroservice || !currentMicroservice?.edit?.dolittle) return false;

    const { id, kind } = currentMicroservice;
    if (id === '' || kind === '' || kind === 'unknown') return false;

    return true;
};

export const editMicroserviceWithStore = async (applicationId: string, environment: string, microserviceId: string, input: InputEditMicroservice): Promise<boolean> => {
    const response = await editMicroservice(applicationId, environment, microserviceId, input);

    if (!response) return response;

    loadMicroservices(applicationId);

    return response;
};

export const canDeleteMicroservice = (environments: HttpInputApplicationEnvironment[], environment: string, microserviceId: string): boolean => {
    const currentMicroservice: MicroserviceObject = findCurrentMicroservice(microserviceId);
    if (!currentMicroservice) return false;

    return canEditMicroservices(environments, environment);
};

export async function deleteMicroserviceWithStore(applicationId: string, environment: string, microserviceId: string): Promise<boolean> {
    const response = await deleteMicroservice(applicationId, environment, microserviceId);

    if (!response) return response;

    let data = get(microservices);

    data = data.filter(ms => ms.id !== microserviceId);
    microservices.set(data);

    return response;
}
