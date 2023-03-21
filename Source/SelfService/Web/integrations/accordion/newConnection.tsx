// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { Accordion, Button, Form, FileUploadForm, Icon, Input, Select } from '@dolittle/design-system';

import { CopyTextBox } from './components/copyTextBox';

const selectValues = [
    { value: 'On Premise', displayValue: 'On Premise' },
    { value: 'In the Dolittle Cloud', displayValue: 'In the Dolittle Cloud' }
];

const instructions = [
    '1. Open Infor ION API. Open the menu from the upper left corner and select ‘Infor ION API’.',
    '2. Select ‘Authorized Apps’ from the left hand menu followed by the ‘+’ icon to add a new account.',
    '3. Provide a name. Example: “Dolittle_Bridge”.',
    '4. Under ‘Type’, select ‘Backend Service’.',
    '5. Provide a description. Example: “Integration Connector”.',
    '6. Toggle on ‘Use Bridge Authentication. Optional: You can toggle on ‘User Impersonation’ if you would like to monitor specific user activity.',
    '7. Click the save icon button.',
    '8. Scroll down and click ‘Download Credentials’ button. If you would like to use an account you’ve previously created, you can access the account via ‘Authorized Apps’ then selecting the account name.',
    '9. When the dialog pops up, toggle on ‘Create Service Account’ and provide a username from your M3 account you would like to associate with the ION service account.',
    '10. Last, click ‘Download’. Upload the files below.',
];

const instructionsList = (items: string[]) => items.map((item, index) => <Typography key={index}>{item}</Typography>);

type InitialSetupParameters = {
    connectorName: string;
    selectHosting: string;
};

type MetadataPublisherParameters = {
    metadataPublisher: string;
    password: string;
};

export const NewConnectionSample = () => {
    return (
        <Box sx={{ maxWidth: 814, mt: 8 }}>
            <Typography variant='subtitle1'>Let’s get your M3 connector up and running...</Typography>

            <Box sx={{ mt: 3, ml: 3 }}>
                <Typography sx={{ maxWidth: 660 }}>
                    This process might take some time depending on access rights and working knowledge of
                    your organization’s firewall and M3 system. You can always save and create the connection setup details then come back at a later time to finish.
                </Typography>

                <Form<InitialSetupParameters>
                    initialValues={{
                        connectorName: '',
                        selectHosting: 'On Premise',
                    }}
                    onSubmit={() => { }}
                    sx={{ mt: 6.5 }}
                >
                    <Stack spacing={3.5}>
                        <Input id='connectorName' label='Connector Name' required />
                        <Select id='selectHosting' label='Hosting' options={selectValues} required disabled />
                    </Stack>
                </Form>
            </Box>

            <Accordion id='firewallAccess' title='Configure Firewall Access' sx={{ mt: 8 }}>
                <Typography sx={{ maxWidth: 660 }}>
                    If you are not responsible for firewall access, please share the information below with the  party responsible for your network infrastructure:
                </Typography>

                <CopyTextBox />
            </Accordion>

            <Accordion id='downloadConnectorBundle' title='Download Connector Bundle' sx={{ mt: 8 }}>
                <Typography sx={{ maxWidth: 660 }}>
                    Once you have opened the host/port combination, you can download the connector bundle and run it. The bundle consists of a Docker compose
                    file, shell file and README file with instructions.
                </Typography>

                <Button label='Download Connector Bundle' startWithIcon={<Icon icon='DownloadRounded' />} sx={{ mt: 3.5 }} />
            </Accordion>

            <Accordion id='MetadataPublisherCredentials' title='Metadata Publisher Credentials' sx={{ mt: 8 }}>
                <Typography sx={{ maxWidth: 660 }}>
                    This will allow us to access your service and provide the data, including custom data fields, needed to configure your application logic.
                </Typography>

                <Form<MetadataPublisherParameters>
                    initialValues={{
                        metadataPublisher: '',
                        password: '',
                    }}
                    onSubmit={() => { }}
                    sx={{ mt: 3 }}
                >
                    <Stack spacing={3.5}>
                        <Input
                            id='metadataPublisher'
                            label='Your Metadata Publisher URL'
                            placeholder='Your metadata publisher URL goes here...'
                            required
                            sx={{ width: 1, maxWidth: 500 }}
                        />
                        <Input id='password' label='Password' placeholder='Password' required />
                    </Stack>
                </Form>
            </Accordion>

            <Accordion id='IONCredentials' title='ION Service Account Credentials' sx={{ mt: 8 }}>
                <Typography sx={{ maxWidth: 660 }}>
                    Follow the steps below then upload your credentials. If you already have an ION service account setup, skip to step 8 to access your credentials.
                </Typography>

                <Box sx={{ 'maxWidth': 660, 'pt': 3, 'pl': 3, '& p': { mb: 2 } }}>
                    {instructionsList(instructions)}
                </Box>

                <Box sx={{ pl: 3 }}>
                    <FileUploadForm onSelected={file => console.log(file)} validFileExtensions={['json']} />
                </Box>
            </Accordion>

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
