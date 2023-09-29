// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid, Typography } from '@mui/material';

import { HttpResponseApplication } from '../../../apis/solutions/application';
import { BackupLinkWithName } from '../../../apis/solutions/backups';

import { BackupsListItems } from './backupsListItems';

export type BackupsListProps = {
    data: BackupLinkWithName[];
    application: HttpResponseApplication;
};

export const BackupsList = ({ data, application }: BackupsListProps) =>
    <>
        <Typography variant='h1' sx={{ my: 3 }}>Backups</Typography>

        <Grid container spacing={3} sx={{ maxWidth: { md: 930, xl: 1400 } }}>
            {data.map(file =>
                <Grid key={file.name} item xs={12} md={6} xl={4}>
                    <BackupsListItems {...file} application={application} />
                </Grid>
            )}
        </Grid>
    </>;
