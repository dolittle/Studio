// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Grid } from '@mui/material';

import { Building } from '@dolittle/design-system';

import { HttpResponseApplication } from '../../apis/solutions/application';
import { BackupLinkWithName } from '../../apis/solutions/backups';

import { BackupsListItems } from './backupsListItems';

export type BackupsListProps = {
    data: BackupLinkWithName[];
    application: HttpResponseApplication;
};

export const BackupsList = ({ data, application }: BackupsListProps) => {
    return (
        <Box sx={{ width: 1, maxWidth: 950 }}>
            <Building />
            <Grid container spacing={4} sx={{ mt: 4, maxWidth: 950 }}>
                {data.map(file =>
                    <Grid key={file.name} item>
                        <BackupsListItems {...file} application={application} />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};
