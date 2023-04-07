// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { Button, MaxWidthTextBlock } from '@dolittle/design-system';

import { TextCopyBox } from './TextCopyBox';

export const ConnectorBundleConfiguration = () =>
    <>
        <Typography variant='subtitle2' gutterBottom>Download connector bundle</Typography>
        <MaxWidthTextBlock>
            Download the connector bundle and run it. The bundle consists of a Docker compose file, shell file and README file with instructions.
        </MaxWidthTextBlock>

        <Button
            label='Download Connector Bundle'
            startWithIcon='DownloadRounded'
            onClick={() => { }}
            sx={{ my: 3.5 }}
        />

        <Typography variant='subtitle2' gutterBottom>Network firewall configuration</Typography>
        <MaxWidthTextBlock>
            {`You will most likely need to configure your organization's firewall access to enable connectivity with the bundle. If you are not
                responsible for firewall access, please share the information below with the responsible party:`}
        </MaxWidthTextBlock>

        <TextCopyBox />
    </>;
