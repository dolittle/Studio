// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { LoadingSpinner } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { BackupsForApplication, getBackupsByApplication } from '../../apis/solutions/backups';

import { BackupsDataGrid, BackupsDetailsList } from './backupsDataGrid';

import { getDateFromFileName } from './utils/getDateFromFileName';

export type BackupsDetailViewProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const BackupsDetailView = ({ application, environment }: BackupsDetailViewProps) => {
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
