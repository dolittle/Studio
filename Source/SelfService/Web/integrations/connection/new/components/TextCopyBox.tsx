// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Paper, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

const instruction1 = `Please make sure your organization's firewall rules allow the M3 connector to connect to Kafka in order to communicate with our API. The Kafka cluster is reachable as:`;
const instruction2 = 'kafka-test-env-dolittle-test-env.aivencloud.com, and is using port 14691.';
const instruction3 = `All IPs for that address need to be available for outgoing traffic on port 14691.
This includes the following IPs:`;
const instruction4 = 'For example, the following IP addresses are reachable:';

const ipAddress1 = '134.122.86.202:14691 (outgoing)';
const ipAddress2 = '165.22.83.2:14691 (outgoing)';
const ipAddress3 = '134.122.94.197:14691 (outgoing)';

const textToCopy = `
${instruction1}

${instruction2}

${instruction3}

${instruction4}

${ipAddress1}

${ipAddress2}

${ipAddress3}
`;

export const TextCopyBox = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleTextCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        enqueueSnackbar('Copied to clipboard');
    };

    return (
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

            <Button
                label='Copy content'
                startWithIcon='CopyAllRounded'
                onClick={handleTextCopy}
            />
        </Paper>
    );
};
