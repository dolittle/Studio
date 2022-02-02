// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { writable } from 'use-svelte-store';
import {
    getPersonalisedInfo,
} from '../api/application';

export type Info = {
    containerRegistryName: string;
    subscriptionId: string;
    applicationId: string;
    endpoints: Endpoints;
    resourceGroup: string;
    clusterName: string;
};

export type Endpoints = {
    cluster: string;
    containerRegistry: string;
};

const data = {
    data: {
        subscriptionId: '',
        applicationId: '',
        containerRegistryName: '',
        endpoints: {
            cluster: '',
            containerRegistry: '',
        } as Endpoints,
        resourceGroup: '',
        clusterName: '',
    } as Info,
    isLoaded: false,
};

export const info = writable(data.data);
export const isLoaded = writable(data.isLoaded);
export const load = (applicationId: string) => {
    Promise.all([
        getPersonalisedInfo(applicationId)
    ]).then(values => {
        const data = values[0];
        data.applicationId = applicationId;
        info.set(data);
        isLoaded.set(true);
    });
};


