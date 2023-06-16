// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { Typography } from '@mui/material';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { BackupsForApplication, getBackupsByApplication } from '../../apis/solutions/backups';

import { BackupsDataGrid, BackupsDetailsList } from './backupsDataGrid';

// Hack to get the date from the file name.
const getDateFromFileName = (fileName: string) => {
    // Remove from string all characters that are not digits, underscores or dashes.
    // From 'petripoint-dev-2023-06-14_05-29-14' to '----2023-06-14_05-29-14'.
    const cleanedFileName = fileName.replace(/[^\d_-]/g, '');

    // From '----2023-06-14_05-29-14' to ['----2023-06-14', '05-29-14'].
    const seperateDateTime = cleanedFileName.split('_');

    // Remove dashes from the beginning of the string.
    // From '['----2023-06-14', '05-29-14']' to '2023-06-14'.
    const date = seperateDateTime[0].replace(/^\-+/gm, '');

    // From '['----2023-06-14', '05-29-14']' to '05:29:14'.
    const time = seperateDateTime[1].replace(/-/g, ':');

    return `${date} at ${time}`;
};

export type ListViewProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const ListView = ({ application, environment }: ListViewProps) => {
    const [data, setData] = useState({} as BackupsForApplication);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getBackupsByApplication(application.id, environment)
        ]).then(values => {
            const _data = values[0];
            setData(_data);
            setIsLoaded(true);
        });
    }, []);

    // TODO: Add loading indicator
    if (!isLoaded) return null;

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
