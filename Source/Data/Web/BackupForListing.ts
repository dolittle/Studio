// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type BackupsForApplication = {
    tenant: string;
    application: string;
    files: string[];
}


export type BackupForListing = {
    tenant: string;
    application: string;
    file: string;
    when: string;
}


export type BackupLink = {
    tenant: string;
    application: string;
    url: string;
    expire: string;
}

