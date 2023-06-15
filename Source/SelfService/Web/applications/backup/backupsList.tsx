// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid, Typography } from '@mui/material';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { BackupLinkWithName } from '../../apis/solutions/backups';

import { BackupsListItems } from './backupsListItems';

export type BackupsListProps = {
    data: BackupLinkWithName[];
    application: HttpResponseApplication;
};

export const BackupsList = ({ data, application }: BackupsListProps) =>
    <>
        <Typography variant='h1' sx={{ mt: 3 }}>Backups</Typography>

        <Grid container spacing={4} sx={{ mt: 4, maxWidth: 950 }}>
            {data.map(file =>
                <Grid key={file.name} item>
                    <BackupsListItems {...file} application={application} />
                </Grid>
            )}
        </Grid>
    </>;
