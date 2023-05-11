// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Grid, Paper, Stack, Typography } from '@mui/material';

import { Accordion, Button, FileUploadForm, Form, Icon, Input, MaxWidthTextBlock, Select } from '@dolittle/design-system';

import { TextCopyBox } from '../../new/components/TextCopyBox';

export const instructions = [
    `1. Open Infor ION API. Open the menu from the upper left corner and select 'Infor ION API'.`,
    `2. Select 'Authorized Apps' from the left hand menu followed by the '+' icon to add a new account.`,
    `3. Provide a name. Example: "Dolittle_Bridge".`,
    `4. Under 'Type', select 'Backend Service'.`,
    `5. Provide a description. Example: "Integration Connector".`,
    `6. Toggle on 'Use Bridge Authentication. Optional: You can toggle on ‘User Impersonation' if you would like to monitor specific user activity.`,
    `7. Click the save icon button.`,
    `8. Scroll down and click 'Download Credentials' button. If you would like to use an account you've previously created, you can access the account via 'Authorized Apps' then selecting the account name.`,
    `9. When the dialog pops up, toggle on 'Create Service Account' and provide a username from your M3 account you would like to associate with the ION service account.`,
    `10. Last, click 'Download'. Upload the files below.`,
];

const InstructionsListItems = () =>
    <Box sx={{ pl: 3, pt: 3 }}>
        {instructions.map((item, index) => (
            <MaxWidthTextBlock key={index} sx={{ mb: 2 }}>{item}</MaxWidthTextBlock>
        ))}
    </Box>;

export const ConfigurationView = () => {
    return (
        <Box sx={{ mt: 6, ml: 2 }}>
            <Typography variant='subtitle1'>Configuration Setup</Typography>

            <Box sx={{ display: 'flex', mt: 4, gap: 2 }}>
                <Button label='Edit' startWithIcon='EditRounded' />
                <Button label='Save' startWithIcon='SaveRounded' disabled />
                <Button label='Delete Connection' startWithIcon='DeleteRounded' />
            </Box>

            <Form
                initialValues={{
                    connectorName: 'M3 Connector Test',
                    selectHosting: 'On premises',
                }}
            >
                <Stack spacing={3} sx={{ mt: 6, ml: 4 }}>
                    <Input id='connectorName' label='Connector Name' required />
                    <Select
                        id='selectHosting'
                        label='Hosting'
                        options={[
                            { value: 'On premises', displayValue: 'On Premise' },
                            { value: 'Cloud', displayValue: 'In the Dolittle Cloud' },
                        ]}
                        disabled
                    />
                </Stack>

                <Accordion
                    id='ConnectorBundleConfiguration'
                    title='Host Your Connector Bundle'
                    progressStatus='success'
                    sx={{ mt: 8 }}
                >
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
                </Accordion>

                <Accordion
                    id=''
                    title='Metadata Publisher Credentials'
                    progressStatus='success'
                    sx={{ mt: 8 }}
                >
                    <MaxWidthTextBlock>
                        This will allow us to access your service and provide the data, including custom data fields, needed to configure your application logic.
                    </MaxWidthTextBlock>

                    <Stack spacing={3.5} sx={{ mt: 3 }}>
                        <Input
                            id='metadataPublisherUrl'
                            label='Your Metadata Publisher URL *'
                            placeholder='Your metadata publisher URL goes here...'
                            sx={{ width: 1, maxWidth: 500 }}
                        />
                        <Input id='metadataPublisherPassword' label='Password *' placeholder='Your password' />
                    </Stack>
                </Accordion>

                <Accordion
                    id=''
                    title='ION Service Account Credentials'
                    progressStatus='success'
                    sx={{ mt: 8 }}
                >
                    <MaxWidthTextBlock sx={{ mb: 2 }}>
                        Follow the steps below then upload your credentials. If you already have an ION service account setup, skip to step 8 to access your credentials.
                    </MaxWidthTextBlock>

                    {/* <InstructionsListItems /> */}
                    {/* <FileUploadForm onSelected={file => console.log(file)} validFileExtensions={['json']} /> */}
                </Accordion>
            </Form>
        </Box>
    );
};
