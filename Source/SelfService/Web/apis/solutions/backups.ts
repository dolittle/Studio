// Copyright (c) Aigonix. All rights reserved.
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

export type BackupLinkWithName = BackupLink & {
    environment: string;
    name: string;
};

export type BackupLinkShareInput = {
    applicationId: string;
    environment: string;
    file_path: string;
};

export async function getLatestBackupLinkByApplication(applicationId: string, environment: string): Promise<BackupLinkWithName> {
    const backups = await getBackupsByApplication(applicationId, environment);

    if (!backups.files[0]) {
        return {
            applicationId,
            environment,
            name: '',
            url: '',
            expire: ''
        };
    }

    const input: BackupLinkShareInput = {
        environment,
        applicationId,
        file_path: backups.files[0],
    };

    const shareLink = await getLink(input);

    return {
        ...shareLink,
        environment,
        name: backups.files[0],
    };
};

export async function getBackupsByApplication(applicationId: string, environment: string): Promise<BackupsForApplication> {
    const url = `${getServerUrlPrefix()}/backups/logs/latest/by/app/${applicationId}/${environment}`;

    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
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
            body: JSON.stringify(input),
        });

    if (!response.ok) {
        return {} as BackupLink;
    }

    const body = await response.json() as BackupLink;
    return body;
};
