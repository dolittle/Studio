// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { Button, Icon } from '@dolittle/design-system';

import { WizardStepSubContent } from './components/WizardStepSubContent';

import { CopyTextBox } from './components/CopyTextBox';

const title1 = '1. Grant firewall access';
const subTitle1 = 'If you are not responsible for firewall access, please share the information below with the party responsible for your network infrastructure:';

const title2 = '2. Download connector bundle and run it';
const subTitle2 = `Once you have opened the host/port combination, you can download the connector bundle and run it.
                    The bundle consists of a Docker compose file, shell file and README file with instructions.`;

export const WizardStepOne = () => {
    return (
        <>
            <Typography variant='h4'>Let’s configure your organization’s firewall access</Typography>

            <WizardStepSubContent title={title1} subTitle={subTitle1}>
                <CopyTextBox />
            </WizardStepSubContent>

            <WizardStepSubContent title={title2} subTitle={subTitle2}>
                <Button label='Download Connector Bundle' startWithIcon={<Icon icon='DownloadRounded' />} sx={{ mt: 2 }} />
            </WizardStepSubContent>

            <Box sx={{ maxWidth: 732, mt: 8, mx: 'auto', color: 'text.secondary', display: 'flex' }}>
                <CircularProgress color='inherit' size={20} />
                <Typography sx={{ ml: 2 }}>Waiting for firewall access...</Typography>
            </Box>
        </>
    );
};
