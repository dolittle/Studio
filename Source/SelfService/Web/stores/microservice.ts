// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { get, writable } from 'use-svelte-store';

import {
    deleteMicroservice as apiDeleteMicroservice,
    saveMicroservice as apiSaveMicroservice,
    MicroserviceInfo,
    getMicroservices,
} from '../api/api';
import { MicroserviceSimple, MicroserviceBusinessMomentAdaptor, MicroserviceDolittle } from '../api/index';
import { Microservice } from '../microservice/Simple';

export type MicroserviceStore = {
    edit: any
    live: MicroserviceInfo
    id: string
    kind: string
    name: string
    environment: string
};

const data = {
    microservices: [] as MicroserviceInfo[],
};

// We do not use the same information from view to edit

export const microservices = writable(data.microservices);

export const mergeMicroservicesFromGit = (items) => {
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
            } as MicroserviceInfo,
        };


        const index = data.findIndex(item => {
            return item.id === storeItem.id;
        });

        if (-1 === index) {
            data = [...data, storeItem];
            return;
        }

        // Use live from the data structure
        storeItem.live = data[index].live;
        data = [...data.slice(0, index), storeItem, ...data.slice(index + 1)];
        return;
    });
    microservices.set(data);
};

export const mergeMicroservicesFromK8s = (items: MicroserviceInfo[]) => {
    let data = get(microservices);
    items.forEach(element => {
        const storeItem = {
            id: element.id,
            name: element.name,
            kind: '',
            environment: element.environment,
            edit: {} as any,
            live: element,
        };

        const index = data.findIndex(item => {
            return item.id === storeItem.id;
        });

        if (-1 === index) {
            data = [...data, storeItem];
            return;
        }

        // Use live from the data structure
        storeItem.edit = data[index].edit;
        storeItem.kind = storeItem.edit.kind;
        return [...data.slice(0, index), storeItem, ...data.slice(index + 1)];
    });
    microservices.set(data);
};


export async function deleteMicroservice(applicationId: string, environment: string, microserviceId: string): Promise<boolean> {
    const response = await apiDeleteMicroservice(applicationId, environment, microserviceId);

    if (!response) {
        return response;
    }

    let data = get(microservices);
    // I dont think we need to care about environment etc, if we trigger reload between
    data = data.filter(ms => ms.id !== microserviceId);
    microservices.set(data);
    return response;
};

const saveMicroservice = async (kind: string, input: any): Promise<boolean> => {
    let response;

    switch (kind) {
        case 'simple':
            response = apiSaveMicroservice(input);
            break;
        case 'business-moments-adaptor':
            response = saveBusinessMomentsAdaptorMicroservice(input as MicroserviceBusinessMomentAdaptor);
            break;
        default:
            alert(`kind: ${kind} not supported`);
            return Promise.resolve(false as boolean);
    }

    if (!response) {
        alert('Sad times');
        return Promise.resolve(false);
    }

    // Add to store
    // Hairy stuff trying to keep track of the edit and the live
    mergeMicroservicesFromGit([input]);
    const applicationId = input.dolittle.applicationId;
    const environment = input.environment;
    const liveMicroservices = await getMicroservices(applicationId);
    const filteredMicroservices = liveMicroservices.microservices.filter(microservice => microservice.environment === environment);
    mergeMicroservicesFromK8s(filteredMicroservices);
    return Promise.resolve(true);
};

export const saveSimpleMicroservice = async (input: MicroserviceSimple): Promise<boolean> => {
    return saveMicroservice(input.kind, input);
};

export const saveBusinessMomentsAdaptorMicroservice = async (input: MicroserviceBusinessMomentAdaptor): Promise<boolean> => {
    return saveMicroservice(input.kind, input);
};


const addOrUpdate = (current: any[], input: any, matchOn: (input: any) => boolean): any[] => {
    const index = current.findIndex(item => matchOn(item));
    if (-1 === index) {
        return [...current, input];
    }
    return [...current.slice(0, index), input, ...current.slice(index + 1)];
};
