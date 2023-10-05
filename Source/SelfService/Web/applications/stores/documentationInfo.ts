// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { writable } from 'use-svelte-store';

import { getPersonalisedInfo } from '../../apis/solutions/application';

export interface Info {
    containerRegistryName: string;
    subscriptionId: string;
    applicationId: string;
    endpoints: Endpoints;
    resourceGroup: string;
    clusterName: string;
    subjectRulesReviewStatus: SubjectRulesReviewStatus;
};

export interface Endpoints {
    cluster: string;
    containerRegistry: string;
};

export interface ResourceRule {
    verbs: string[];
    apiGroups: string[];
    resources: string[];
    resourceNames: string[];
};

export interface NonResourceRule {
    verbs: string[];
    nonResourceURLs: string[];
};

export interface SubjectRulesReviewStatus {
    resourceRules: ResourceRule[];
    nonResourceRules: NonResourceRule[];
    incomplete: boolean;
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
        subjectRulesReviewStatus: {
            incomplete: false,
            resourceRules: [] as ResourceRule[],
            nonResourceRules: [] as NonResourceRule[],
        } as SubjectRulesReviewStatus,
    } as Info,
    isLoaded: false,
};

export const info = writable(data.data);
export const isLoaded = writable(data.isLoaded);
export const load = (applicationId: string) => {
    Promise.all([
        getPersonalisedInfo(applicationId),
    ]).then(values => {
        const data = values[0];
        data.applicationId = applicationId;
        info.set(data);
        isLoaded.set(true);
    });
};
