// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { get, writable } from 'use-svelte-store';

import { MicroserviceDolittle, MicroserviceSimple } from '../../apis/solutions/index';
import { deleteMicroservice, getMicroservices, HttpResponseMicroservices, MicroserviceInfo, saveMicroservice } from '../../apis/solutions/api';
import { getApplication, HttpResponseApplication, HttpInputApplicationEnvironment } from '../../apis/solutions/application';

export type MicroserviceStore = {
    id: string;
    name: string;
    kind: string;
    environment: string;
    live: MicroserviceInfo;
    edit: MicroserviceSimple;
};

const data = {
    microservices: [] as MicroserviceInfo[],
    isLoaded: false,
};

// We do not use the same information from view to edit.
export const microservices = writable(data.microservices);
export const isLoaded = writable(data.isLoaded);

export const loadMicroservices = (applicationId: string) => {
    Promise.all([getApplication(applicationId), getMicroservices(applicationId)])
        .then(values => {
            const applicationData = values[0];
            mergeMicroservicesFromGit(applicationData.microservices);

            const microservicesData = values[1] as HttpResponseMicroservices;
            mergeMicroservicesFromK8s(microservicesData.microservices);

            isLoaded.set(true);
        });
};

export const mergeMicroservicesFromGit = (items: MicroserviceSimple[]) => {
    let data = get(microservices);

    items.forEach(element => {
        const storeItem = {
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
            } as MicroserviceInfo,
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

export const mergeMicroservicesFromK8s = (items: MicroserviceInfo[]) => {
    let data = get(microservices);

    items.forEach(element => {
        const storeItem = {
            id: element.id,
            name: element.name,
            kind: '', // TODO life would be so much simpler if we knew what this was, maybe adding the label for it.
            environment: element.environment,
            edit: {} as any,
            live: element,
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
    };

    // TODO ERROR: Temporarily commented out because of error in API.
    //if (!response) return response;

    mergeMicroservicesFromGit(application.microservices);
    const liveMicroservices = await getMicroservices(application.id);
    mergeMicroservicesFromK8s(liveMicroservices.microservices);

    return response;
};

export const saveSimpleMicroserviceWithStore = (input: MicroserviceSimple, application: HttpResponseApplication) =>
    saveMicroserviceWithStore(input.kind, input, application);

export const canEditMicroservices = (environments: HttpInputApplicationEnvironment[], environment: string): boolean =>
    environments.some(info => info.name === environment && info.automationEnabled);

export const findCurrentMicroservice = (microserviceId: string): MicroserviceStore => {
    const data = get(microservices);
    return data.find(ms => ms.id === microserviceId);
};

export const canEditMicroservice = (environments: HttpInputApplicationEnvironment[], environment: string, microserviceId: string): boolean => {
    if (!canDeleteMicroservice(environments, environment, microserviceId)) return false;

    const currentMicroservice: MicroserviceStore = findCurrentMicroservice(microserviceId);
    if (!currentMicroservice || !currentMicroservice?.edit?.dolittle) return false;

    const { id, kind } = currentMicroservice;
    if (id === '' || kind === '' || kind === 'unknown') return false;

    return true;
};

export const canDeleteMicroservice = (environments: HttpInputApplicationEnvironment[], environment: string, microserviceId: string): boolean => {
    const currentMicroservice: MicroserviceStore = findCurrentMicroservice(microserviceId);
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
};
