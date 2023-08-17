// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { Typography } from '@mui/material';

import { LoadingSpinner } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { BackupsForApplication, getBackupsByApplication } from '../../apis/solutions/backups';

import { BackupsDataGrid, BackupsDetailsList } from './backupsDataGrid';

import { dateRegex, timeRegex } from '../../utils/helpers/regex';

// Hack to get the date from the file name.
const getDateFromFileName = (fileName: string) => {
    if (typeof fileName !== 'string') return 'N/A';

    // Remove from string all characters that are not digits, underscores or dashes.
    // From '/petripoint-dev-backup/mongo/petripoint-dev-2023-06-14_05-29-14.gz.mongodump' to '----2023-06-14_05-29-14'.
    const cleanedFileName = fileName.replace(/[^\d_-]/g, '');

    // From '----2023-06-14_05-29-14' to ['----2023-06-14', '05-29-14'].
    const dateAndTime = cleanedFileName.split('_');

    // Remove dashes from the beginning of the string.
    // From '['----2023-06-14', '05-29-14']' to '2023-06-14'.
    const date = dateAndTime[0].replace(/^\-+/gm, '');

    // From '['----2023-06-14', '05-29-14']' to '05:29:14'.
    const time = dateAndTime[1].replace(/-/g, ':');

    // Check if the date and time are valid.
    if (!dateRegex.test(date) || !timeRegex.test(time)) {
        return 'N/A';
    }

    return `${date} at ${time}`;
};

export type BackupsListViewProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const BackupsListView = ({ application, environment }: BackupsListViewProps) => {
    const [data, setData] = useState({} as BackupsForApplication);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getBackupsByApplication(application.id, environment)])
            .then(values => {
                const _data = values[0];
                setData(_data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <LoadingSpinner />;

    const backups: BackupsDetailsList[] = data.files.map<BackupsDetailsList>(file => {
        return {
            id: file,
            file,
            createdOn: getDateFromFileName(file),
            environment,
        };
    });

    return (
        <>
            <Typography variant='h1' sx={{ mt: 3 }}>{application.name}</Typography>
            <Typography variant='subtitle1' sx={{ my: 2 }}>{`${environment} Environment`}</Typography>
            <BackupsDataGrid backupsDataGridRows={backups} applicationId={application.id} />
        </>
    );
};
