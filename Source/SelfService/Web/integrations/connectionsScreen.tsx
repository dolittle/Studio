// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';

import { Button, SelectCard } from '@dolittle/design-system';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 6,
    },
    container: {
        justifyContent: 'center',
        mt: 11.25,
    },
    subtitle: {
        mt: 6,
        textAlign: 'center'
    },
    footer: {
        width: 1,
        mt: 'auto',
        pt: 11.25,
        pb: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
};

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

export const ConnectionsScreen = () => {
    const navigate = useNavigate();

    return (
        <>
            <Typography variant='h1'>New M3 Connection</Typography>
            <Typography variant='h4' sx={styles.subtitle}>Before we get started, where would you like to host your M3 connector?</Typography>

            <Grid container spacing={3} sx={styles.container}>
                <Grid item>
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

                <Grid item>
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

            <Box sx={styles.footer}>
                <Button label='cancel' color='subtle' onClick={() => { }} />
                <Button label='get started' variant='filled' onClick={() => navigate('wizard')} />
            </Box>
        </>
    );
};
