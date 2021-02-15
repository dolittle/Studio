// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

export type BackupForListing = {
    id: Guid;
    applicationId: Guid;
    microserviceId: Guid;
    name: string;
    data: Date;
};


export type BackupsForApplication = {
    tenant: string;
    application: string;
    files: string[];
}


export type BackupForListing2 = {
    tenant: string;
    application: string;
    file: string;
}


export type BackupLink = {
    tenant: string;
    application: string;
    url: string;
    expire: string;
}

