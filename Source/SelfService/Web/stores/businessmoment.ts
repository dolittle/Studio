// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { get, writable } from 'use-svelte-store';
import { getServerUrlPrefix, _checkRedirect } from '../api/api';

import {
    deleteBusinessmoment as apiDeleteBusinessmoment,
    getBusinessMoments,
    saveBusinessmoment as apiSaveBusinessmoment,
    saveBusinessmomentEntity as apiSaveBusinessmomentEntity,
} from '../api/businessmoments';
import { HttpInputBusinessMoment, HttpInputBusinessMomentEntity, HttpResponseBusinessMoments } from '../api/index';

const data = {
    data: {
        applicationId: '', // TODO the http is application_id
        environment: '',
        moments: [],
        entities: [],
    } as HttpResponseBusinessMoments, // TODO
    isLoaded: false,
};


// We do not use the same information from view to edit

export const businessmoments = writable(data.data);
export const isLoaded = writable(data.isLoaded);
export const load = (applicationId: string, environment: string) => {
    Promise.all([
        getBusinessMoments(applicationId, environment)
    ]).then(values => {
        businessmoments.set(values[0]);
        isLoaded.set(true);
    });
};


export async function deleteBusinessmoment(applicationId: string, environment: string, microserviceId: string, momentId: string): Promise<boolean> {
    const response = await apiDeleteBusinessmoment(applicationId, environment, microserviceId, momentId);

    if (!response) {
        return response;
    }

    const newData = await getBusinessMoments(applicationId, environment);
    businessmoments.set(newData);
    return true;
};


export async function saveBusinessmoment(input: HttpInputBusinessMoment): Promise<boolean> {
    const response = await apiSaveBusinessmoment(input);
    if (!response) {
        return response;
    }

    const newData = await getBusinessMoments(input.applicationId, input.environment);
    businessmoments.set(newData);
    return true;
}

export async function saveBusinessmomentEntity(input: HttpInputBusinessMomentEntity): Promise<boolean> {
    const response = await apiSaveBusinessmomentEntity(input);
    if (!response) {
        return response;
    }

    const newData = await getBusinessMoments(input.applicationId, input.environment);
    businessmoments.set(newData);
    return true;
}
