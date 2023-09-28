// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BackupLink, BackupLinkShareInput, getLink } from '../../../apis/solutions/backups';

export type BackupsDetailsList = {
    environment: string;
    file: string;
    createdOn: string;
};

export const getBackupShareLink = async (row: BackupsDetailsList, applicationId: string) => {
    const input: BackupLinkShareInput = {
        applicationId,
        environment: row?.environment,
        file_path: row?.file,
    };

    const share: BackupLink = await getLink(input);

    return share.url;
};
