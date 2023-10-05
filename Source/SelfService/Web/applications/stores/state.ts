// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { get, writable } from 'use-svelte-store';

const data = {
    microservices: [],
    applications: [],
};

export const microservices = writable(data.microservices);
export const applications = writable(data.applications);

export const setMicroservices = (items) => {
    microservices.set(items);
};

export const dump = () => {
    console.log(get(microservices));
};

export const addMicroservice = (item) => {
    microservices.update((items) => {
        // TODO Do we need to edit
        items.push(item);
    });
};
