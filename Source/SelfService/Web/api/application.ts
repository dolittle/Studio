// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Exception } from '@dolittle/rudiments';
import { getServerUrlPrefix } from './api';

export type HttpApplicationRequest = {
    id: string;
    name: string;
    //contactName: string;
    //contactEmail: string;
    tenantId: string;
    environments: string[];
};

export async function getPersonalisedInfo(applicationId: string): Promise<any> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/personalised-application-info`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult = await result.json() as any;
    return jsonResult;
}


export async function createApplication(input: HttpApplicationRequest): Promise<any> {
    const url = `${getServerUrlPrefix()}/application`;
    const response = await fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(input),
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        });

    const text = await response.text();

    if (!response.ok) {
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(text);
        } catch (error) {
            throw Error('Failed to create application');
        }
    }

    return JSON.parse(text);
}
