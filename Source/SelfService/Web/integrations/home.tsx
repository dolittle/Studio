// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Grid } from '@mui/material';

import { SelectCard } from '@dolittle/design-system';

const onPremiseList = [
    'Docker',
    'Firewall access',
    'Ion M3 (and optionally the meta data publisher)',
    'Admin level access to M3',
    'Approximately 16gb ram',
];

const dolittleCloudList = [
    'Firewall access',
    'Ion M3(and optionally the meta data publisher)',
    'Admin level access to M3',
];

// sx={{ height: 'fit-content', display: 'flex', justifyContent: 'center', alignContent: 'center', gap: 3 }}
export const HomeScreen = () =>
    <>
        <Grid container sx={{}}>
            <Grid item xs={4}>
                <SelectCard
                    icon='DnsRounded'
                    title='On Premise'
                    description='Your team will be responsible for hosting, establishing backups and making sure the connector is running.'
                    listTitle={`What you'll need`}
                    listItems={onPremiseList}
                    footerTitle='Approximate setup time'
                    footerText='10 min'
                />
            </Grid>

            <Grid item xs={4}>
                <SelectCard
                    icon='CloudRounded'
                    title='In the Dolittle Cloud'
                    description='We handle the hosting, establish backups and make sure the connector is running.'
                    listTitle={`What you'll need`}
                    listItems={dolittleCloudList}
                    footerTitle='Approximate setup time'
                    footerText='10 min'
                />
            </Grid>
        </Grid>
    </>;
