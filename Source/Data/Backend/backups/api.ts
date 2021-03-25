// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import fetch from 'node-fetch';

import { getPlatformDownloadServerBasePath, getPlatformDownloadServerHeaderSecret } from '../environment';
import { ApplicationForListing } from './ApplicationForListing';
import { BackupLinkShareInput } from './BackupForListing';

export async function fetchBackupsByApplication(tenant: string, name: string, environment: string): Promise<any> {
    const response = await fetch(`${getPlatformDownloadServerBasePath()}/logs/latest/by/app/${tenant}/${name}/${environment}`, {
        headers: {
            'x-secret': getPlatformDownloadServerHeaderSecret(),
        }
    });

    if (!response.ok) {
        return {};
    }

    const body = await response.json();
    return body;
}

export async function fetchLink(input: BackupLinkShareInput): Promise<any> {
    const response = await fetch(`${getPlatformDownloadServerBasePath()}/logs/link`, {
        method: 'POST',
        headers: {
            'x-secret': getPlatformDownloadServerHeaderSecret(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        console.log(input);
        console.log(response);
        return {};
    }

    const body = await response.json();
    return body;
}

export async function fetchApplications(tenantId: string): Promise<ApplicationForListing> {
    const response = await fetch(`${getPlatformDownloadServerBasePath()}/logs/applications/${tenantId}`, {
        headers: {
            'x-secret': getPlatformDownloadServerHeaderSecret(),
        }
    });

    if (!response.ok) {
        return {
            applications: [],
            tenant: {
                id: '',
                name: ''
            }
        } as ApplicationForListing;
    }

    const data: ApplicationForListing = await response.json();
    return data;
}
