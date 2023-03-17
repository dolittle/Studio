// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, CircularProgress, Paper, Typography } from '@mui/material';

import { Button, Icon } from '@dolittle/design-system';

export const WizardStepOne = () => {
    return (
        <>
            <Typography variant='h4'>Let’s configure your organization’s firewall access</Typography>

            <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
                <Typography variant='subtitle2' sx={{ mb: 1 }}>1. Grant firewall access</Typography>

                <Typography>
                    If you are not responsible for firewall access, please share the information below with the
                    party responsible for your network infrastructure:
                </Typography>

                <Paper elevation={0} sx={{ 'mt': 3, 'p': 2, '& p': { mb: 3 } }}>
                    <Typography>
                        Please make sure your organization’s firewall rules allow the M3 connector to connect to Kafka in order
                        to communicate with our API. The Kafka cluster is reachable as:
                    </Typography>

                    <Typography>
                        <b>kafka-test-env-dolittle-test-env.aivencloud.com</b>, and is using <b>port 14691</b>.
                    </Typography>

                    <Typography>
                        All IPs for that address need to be available for outgoing traffic on port 14691. <br />
                        This includes the following IPs:
                    </Typography>

                    <Typography>For example, the following IP addresses are reachable:</Typography>

                    <Typography>134.122.86.202:14691 (outgoing)</Typography>
                    <Typography>165.22.83.2:14691 (outgoing)</Typography>
                    <Typography>134.122.94.197:14691 (outgoing)</Typography>

                    <Button label='Copy content' startWithIcon={<Icon icon='CopyAllRounded' />} />
                </Paper>
            </Box>

            <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
                <Typography variant='subtitle2' sx={{ mb: 1 }}>2. Download connector bundle and run it</Typography>

                <Typography sx={{ mb: 3 }}>
                    Once you have opened the host/port combination, you can download the connector bundle and run it.
                    The bundle consists of a Docker compose file, shell file and README file with instructions.
                </Typography>

                <Button label='Download Connector Bundle' startWithIcon={<Icon icon='DownloadRounded' />} />
            </Box>

            <Box sx={{ maxWidth: 732, mt: 8, mx: 'auto', color: 'text.secondary', display: 'flex' }}>
                <CircularProgress color='inherit' size={20} />
                <Typography sx={{ ml: 2 }}>Waiting for firewall access...</Typography>
            </Box>
        </>
    );
};
