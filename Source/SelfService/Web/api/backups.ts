// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getServerUrlPrefix, ShortInfo } from './api';

export type BackupsForApplication = {
    application: ShortInfo;
    environment: string;
    files: string[];
};

export type BackupLink = {
    applicationId: string;
    url: string;
    expire: string;
};

export type BackupLinkShareInput = {
    applicationId: string;
    environment: string;
    file_path: string;
};

export async function getLatestBackupLinkByApplication(applicationID: string, environment: string): Promise<string> {
    const backups = await getBackupsByApplication(applicationID, environment);

    if (!backups.files[0]) {
        return '';
    }

    const input: BackupLinkShareInput = {
        environment,
        applicationId: applicationID,
        file_path: backups.files[0]
    };

    const shareLink = await getLink(input);
    return shareLink.url;
};

export async function getBackupsByApplication(applicationID: string, environment: string): Promise<BackupsForApplication> {
    const url = `${getServerUrlPrefix()}/backups/logs/latest/by/app/${applicationID}/${environment}`;

    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });

    const body: any = await response.json() as BackupsForApplication;
    return body;
};

export async function getLink(input: BackupLinkShareInput): Promise<BackupLink> {
    const url = `${getServerUrlPrefix()}/backups/logs/link`;

    const response = await fetch(
        url,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });

    if (!response.ok) {
        console.log(input);
        console.log(response);
        return {} as BackupLink;
    }

    const body = await response.json() as BackupLink;
    return body;
};
