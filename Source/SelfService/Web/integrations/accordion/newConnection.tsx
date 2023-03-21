// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { Button, FileUploadForm, Icon } from '@dolittle/design-system';

import { CopyTextBox } from './components/copyTextBox';
import { InitialSetupForm } from './components/initialSetupForm';
import { MetadataPublisherForm } from './components/metadataPublisherForm';
import { NewConnectionAccordion } from './components/newConnectionAccordion';
import { InstructionsList } from './components/instructionsList';

const newConnectionDescription = `This process might take some time depending on access rights and working knowledge of
                    your organization's firewall and M3 system. You can always save and create the connection setup details then come back at a later time to finish.`;
const firewallAccessDescription = 'If you are not responsible for firewall access, please share the information below with the  party responsible for your network infrastructure:';
const connectorBundleDescription = `Once you have opened the host/port combination, you can download the connector bundle and run it. The bundle consists of a Docker compose
                    file, shell file and README file with instructions.`;
const metadataPublisherDescription = `This will allow us to access your service and provide the data, including custom data fields, needed to configure your application logic.`;
const ionCredentialsDescription = `Follow the steps below then upload your credentials. If you already have an ION service account setup, skip to step 8 to access your credentials.`;

export const NewConnectionSample = () => {
    return (
        <Box sx={{ maxWidth: 814, mt: 8 }}>
            <Typography variant='subtitle1'>{`Let's get your M3 connector up and running...`}</Typography>

            <Box sx={{ mt: 3, ml: 3 }}>
                <Typography sx={{ maxWidth: 660 }}>{newConnectionDescription}</Typography>
                <InitialSetupForm />
            </Box>

            <NewConnectionAccordion id='firewallAccess' title='Configure Firewall Access' description={firewallAccessDescription}>
                <CopyTextBox />
            </NewConnectionAccordion>

            <NewConnectionAccordion id='downloadConnectorBundle' title='Download Connector Bundle' description={connectorBundleDescription}>
                <Button label='Download Connector Bundle' startWithIcon={<Icon icon='DownloadRounded' />} sx={{ mt: 3.5 }} onClick={() => { }} />
            </NewConnectionAccordion>

            <NewConnectionAccordion id='metadataPublisherCredentials' title='Metadata Publisher Credentials' description={metadataPublisherDescription}>
                <MetadataPublisherForm />
            </NewConnectionAccordion>

            <NewConnectionAccordion id='ionCredentials' title='ION Service Account Credentials' description={ionCredentialsDescription}>
                <InstructionsList />

                <Box sx={{ pl: 3 }}>
                    <FileUploadForm onSelected={file => console.log(file)} validFileExtensions={['json']} />
                </Box>
            </NewConnectionAccordion>

            <Button
                label='Create connection'
                variant='filled'
                startWithIcon={<Icon icon='PolylineRounded' />}
                onClick={() => { }}
                sx={{ my: 8 }}
            />
        </Box>
    );
};
