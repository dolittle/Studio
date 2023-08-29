// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getServerUrlPrefix, JobInfo, parseJSONResponse, ShortInfoWithEnvironment, HttpResponseMessage, ShortInfo } from './api';

export type HttpInputApplicationAccess = {
    email: string;
};

export type HttpApplicationEnvironmentCustomerTenant = {
    id: string;
};

export type HttpApplicationEnvironment = {
    name: string;
    customerTenants: HttpApplicationEnvironmentCustomerTenant[];
};

export type HttpApplicationRequest = {
    id: string;
    name: string;
    //contactName: string;
    //contactEmail: string;
    environments: HttpApplicationEnvironment[];
};

export type ApplicationBuildState = {
    status: string;
    startedAt: string;
    finishedAt: string;
};

export type HttpResponseApplications = {
    canCreateApplication: boolean;
    applications: ShortInfoWithEnvironment[];
};

export type HttpResponseApplicationsListing = {
    canCreateApplication: boolean;
    applications: ShortInfo[];
};

export type HttpInputApplicationEnvironment = {
    applicationId: string;
    name: string;
    automationEnabled: boolean;
    connections: HttpEnvironmentConnections;
};

export type HttpResponseApplication = {
    id: string;
    name: string;
    customerId: string;
    customerName: string;
    environments: HttpInputApplicationEnvironment[];
    microservices: any[]; // Not great
};

export type HttpResponseApplicationAccess = {
    id: string;
    name: string;
    users: HttpInputApplicationAccess[];
};

export type HttpEnvironmentConnections = {
    m3Connector: boolean;
};

export async function getPersonalisedInfo(applicationId: string): Promise<any> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/personalised-application-info`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
        });

    const jsonResult = await result.json() as any;
    return jsonResult;
};


export async function createApplication(input: HttpApplicationRequest): Promise<JobInfo | any> {
    const url = `${getServerUrlPrefix()}/application`;

    const response = await fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(input),
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
        });

    const data = await parseJSONResponse(response);
    return data;
};

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
};

export async function getLiveApplications(): Promise<any> {
    const url = `${getServerUrlPrefix()}/live/applications`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
        });

    const jsonResult = await result.json();
    return jsonResult;
};

export async function getApplications(): Promise<HttpResponseApplications> {
    const url = `${getServerUrlPrefix()}/applications`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
        });

    const jsonResult: HttpResponseApplications = await result.json();
    jsonResult.applications = jsonResult.applications || [];
    return jsonResult;
};


export async function getApplicationsListing(): Promise<HttpResponseApplicationsListing> {
    const applicationsWithEnvironment = await getApplications();

    const applicationListing = applicationsWithEnvironment.applications.map((app) => ({ id: app.id, name: app.name }));
    const uniqueApplications = new Map<string, ShortInfo>();
    applicationListing.forEach(appListing => uniqueApplications.set(appListing.id, appListing));

    return {
        canCreateApplication: applicationsWithEnvironment.canCreateApplication,
        applications: Array.from(uniqueApplications.values()),
    };
}

export async function getApplication(applicationId: string): Promise<HttpResponseApplication> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
        });

    const jsonResult: HttpResponseApplication = await result.json();
    jsonResult.microservices = jsonResult.microservices || [];

    jsonResult.environments.map(environment => {
        environment.connections = environment.connections || {
            m3Connector: false
        };

        return environment;
    });

    return jsonResult;
};


export async function getAdminApplicationAccess(customerId: string, applicationId: string): Promise<HttpResponseApplicationAccess> {
    const url = `${getServerUrlPrefix()}/admin/customer/${customerId}/application/${applicationId}/access/users`;

    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
        });

    const data = await parseJSONResponse(response);
    return data;
};

export async function adminApplicationAccessAddUser(customerId: string, applicationId: string, input: HttpInputApplicationAccess): Promise<HttpResponseMessage> {
    const url = `${getServerUrlPrefix()}/admin/customer/${customerId}/application/${applicationId}/access/user`;

    const response = await fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(input),
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
        });

    const data = await parseJSONResponse(response);
    return data;
};

export async function adminApplicationAccessRemoveUser(customerId: string, applicationId: string, input: HttpInputApplicationAccess): Promise<HttpResponseMessage> {
    const url = `${getServerUrlPrefix()}/admin/customer/${customerId}/application/${applicationId}/access/user`;

    const response = await fetch(
        url,
        {
            method: 'DELETE',
            body: JSON.stringify(input),
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
        });

    const data = await parseJSONResponse(response);
    return data;
};
