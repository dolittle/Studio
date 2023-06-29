// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Typography } from '@mui/material';

import { Button, MaxWidthTextBlock } from '@dolittle/design-system';
import { getBridgeServerUrlPrefix } from '../../../apis/integrations/api';

import { TextCopyBox } from './TextCopyBox';

const copyInstructions = [
    `Please make sure your organization's firewall rules allow the M3 connector to connect to Kafka in order to communicate with our API. The Kafka cluster is reachable as:`,
    `kafka-test-env-dolittle-test-env.aivencloud.com, and is using port 14691.`,
    `All IPs for that address need to be available for outgoing traffic on port 14691.
This includes the following IPs:`,
    'For example, the following IP addresses are reachable:',
    '134.122.86.202:14691 (outgoing)',
    '165.22.83.2:14691 (outgoing)',
    '134.122.94.197:14691 (outgoing)',
];

export type ConnectorBundleConfigurationProps = {
    connectionId: string;
};

export const ConnectorBundleConfiguration = ({ connectionId }: ConnectorBundleConfigurationProps) => {
    const apiPrefix = getBridgeServerUrlPrefix();
    const downloadUrl = `${apiPrefix}/connections/${connectionId}/connector-deployment`;

    return <>
        <Typography variant='subtitle2' gutterBottom>Download connector bundle</Typography>
        <MaxWidthTextBlock>
            Download the connector bundle and run it. The bundle consists of a Docker compose file, shell file and README file with instructions.
        </MaxWidthTextBlock>

        <Button
            label='Download Connector Bundle'
            startWithIcon='DownloadRounded'
            href={downloadUrl}
            sx={{ my: 3.5 }}
            overrides={{
                download: `connector-bundle-${connectionId}.zip`
            }}
        />

        <Typography variant='subtitle2' gutterBottom>Network firewall configuration</Typography>
        <MaxWidthTextBlock>
            {`You will most likely need to configure your organization's firewall access to enable connectivity with the bundle. If you are not
                responsible for firewall access, please share the information below with the responsible party:`}
        </MaxWidthTextBlock>

        <TextCopyBox instructions={copyInstructions} withMaxWidth>
            <Typography component='span'>
                Please make sure your organization’s firewall rules allow the M3 connector to connect to Kafka in order
                to communicate with our API. The Kafka cluster is reachable as:
            </Typography>

            <Typography component='span'>
                <b>kafka-test-env-dolittle-test-env.aivencloud.com</b>, and is using <b>port 14691</b>.
            </Typography>

            <Typography component='span'>
                All IPs for that address need to be available for outgoing traffic on port 14691. <br />
                This includes the following IPs:
            </Typography>

            <Typography component='span'>For example, the following IP addresses are reachable:</Typography>

            <Typography component='span'>134.122.86.202:14691 (outgoing)</Typography>
            <Typography component='span'>165.22.83.2:14691 (outgoing)</Typography>
            <Typography component='span'>134.122.94.197:14691 (outgoing)</Typography>
        </TextCopyBox>

    </>;
};
