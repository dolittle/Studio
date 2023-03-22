// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { Button, FileUploadForm } from '@dolittle/design-system';

import { AccordionList, AccordionListProps, NewConnectionAccordion } from './components/newConnectionAccordion';
import { InitialSetupForm } from './components/initialSetupForm';
import { MetadataPublisherForm } from './components/metadataPublisherForm';
import { InstructionsList } from './components/instructionsList';
import { ConnectorBundle } from './components/connectorBundle';

const newConnectionDescription = `This process might take some time depending on access rights and working knowledge of
                    your organization's firewall and M3 system. You can always save and create the connection setup details then come back at a later time to finish.`;
const metadataPublisherDescription = `This will allow us to access your service and provide the data, including custom data fields, needed to configure your application logic.`;
const ionCredentialsDescription = `Follow the steps below then upload your credentials. If you already have an ION service account setup, skip to step 8 to access your credentials.`;

export const NewConnectionSample = () => {
    const accordionProps: AccordionListProps = {
        items: [
            {
                id: 'hostConnectorBundle',
                title: 'Host Your Connector Bundle',
                children: <ConnectorBundle />
            },
            {
                id: 'metadataPublisherCredentials',
                title: 'Metadata Publisher Credentials',
                description: metadataPublisherDescription,
                children: <MetadataPublisherForm />
            },
            {
                id: 'ionCredentials',
                title: 'ION Service Account Credentials',
                description: ionCredentialsDescription,
                children: (
                    <>

                        <InstructionsList />
                        <Box sx={{ pl: 3 }}>
                            <FileUploadForm onSelected={file => console.log(file)} validFileExtensions={['json']} />
                        </Box>
                    </>
                )
            }

        ],
        singleExpandMode: true
    };

    return (
        <>
            <Typography variant='h1'>New M3 Connection</Typography>

            <Box sx={{ maxWidth: 814, mt: 7, ml: 1 }}>
                <Typography variant='subtitle1'>{`Let's get your M3 connector up and running...`}</Typography>

                <Box sx={{ mt: 3, ml: 3 }}>
                    <Typography sx={{ maxWidth: 660 }}>{newConnectionDescription}</Typography>
                    <InitialSetupForm />
                </Box>
                <AccordionList  {...accordionProps} />

                {/* <NewConnectionAccordion id='hostConnectorBundle' title='Host Your Connector Bundle'>
                    <ConnectorBundle />
                </NewConnectionAccordion>

                <NewConnectionAccordion id='metadataPublisherCredentials' title='Metadata Publisher Credentials' description={metadataPublisherDescription}>
                    <MetadataPublisherForm />
                </NewConnectionAccordion>

                <NewConnectionAccordion id='ionCredentials' title='ION Service Account Credentials' description={ionCredentialsDescription}>
                    <InstructionsList />

                    <Box sx={{ pl: 3 }}>
                        <FileUploadForm onSelected={file => console.log(file)} validFileExtensions={['json']} />
                    </Box>
                </NewConnectionAccordion> */}

                <Box sx={{ my: 5 }}>
                    <Button
                        label='Save connection'
                        disabled
                        onClick={() => { }}
                        sx={{ mr: 3 }}
                    />

                    <Button
                        label='Start Mapping Data'
                        variant='filled'
                        disabled
                        href='#'
                    />
                </Box>
            </Box>
        </>
    );
};
