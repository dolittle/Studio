// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { getServerUrlPrefix, JobInfo, parseJSONResponse } from './api';

export type HttpApplicationRequest = {
    id: string;
    name: string;
    //contactName: string;
    //contactEmail: string;
    tenantId: string;
    environments: string[];
};

export type ApplicationBuildState = {
    status: string;
    startedAt: string;
    finishedAt: string;
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


export async function createApplication(input: HttpApplicationRequest): Promise<JobInfo | any> {
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

    const data = await parseJSONResponse(response);
    return data;
}

export async function isApplicationOnline(applicationID: string): Promise<ApplicationBuildState | any> {
    const url = `${getServerUrlPrefix()}/application/${applicationID}/check/isonline`;
    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
        });

    const data = await parseJSONResponse(response);
    return data;
}
