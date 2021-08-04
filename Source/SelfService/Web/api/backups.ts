// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { getServerUrlPrefix } from './api';
import { applications } from '../stores/state';
// HACK for getting testdata
//const testData = require('./testdata/insights-runtime-v1.json');

export type DolittleTenant = {
    id: string
    name: string
};

export type CustomerApplication = {
    id: string
    name: string
    environment: string
};


export type CustomerDomain = {
    name: string
};

export type ApplicationForListing = {
    applications: CustomerApplication[]
    tenant: DolittleTenant
};

export type BackupsForApplication = {
    tenant: DolittleTenant
    application: string
    environment: string
    files: string[]
};


export type BackupLink = {
    tenant: string;
    application: string;
    url: string;
    expire: string;
};

export type BackupLinkShareInput = {
    tenant_id: string;
    application: string;
    environment: string;
    file_path: string;
};

export async function getLatestBackupLinkByApplication(tenant: string, name: string, environment: string): Promise<string> {
    const backups = await getBackupsByApplication(tenant, name, environment);

    if (!backups.files[0]) {
        return '';
    }


    const input: BackupLinkShareInput = {
        tenant_id: backups.tenant.id,
        environment,
        application: backups.application,
        file_path: backups.files[0],
    };

    const shareLink = await getLink(input);
    return shareLink.url;
}


export async function getBackupsByApplication(tenant: string, name: string, environment: string): Promise<BackupsForApplication> {
    const url = `${getServerUrlPrefix()}/share/logs/latest/by/app/${tenant}/${name}/${environment}`;
    console.log(url);
    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });

    const body: any = await response.json() as BackupsForApplication;
    return body;
}

export async function getLink(input: BackupLinkShareInput): Promise<BackupLink> {
    const url = `${getServerUrlPrefix()}/share/logs/link`;
    const response = await fetch(
        url,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input),
        });

    if (!response.ok) {
        console.log(input);
        console.log(response);
        return {} as BackupLink;
    }

    const body = await response.json() as BackupLink;
    return body;
}
