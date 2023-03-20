// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { FileUploadForm, Form, Icon, Input, Link } from '@dolittle/design-system';

import { WizardStepSubContent } from './components/WizardStepSubContent';

const title1 = '1. Provide your metadata publisher credentials';
const subTitle1 = 'This will allow us to access your service and provide the data needed to configure your application logic.';

const title2 = '2. Setup ION service account and upload credentials';
const subTitle2 = 'Follow the steps below then upload your credentials. If you already have an ION service account setup, skip to step 8 to access your credentials.';

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

export const WizardStepTwo = () => {
    return (
        <>
            <Typography variant='h4'>Now it’s time to setup your credentials</Typography>

            <WizardStepSubContent title={title1} subTitle={subTitle1}>
                <Form
                    initialValues={{
                        metadataPublisher: '',
                        password: '',
                    }}
                    onSubmit={() => { }}
                    sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}
                >
                    <Input
                        id='metadataPublisher'
                        label='Your Metadata Publisher URL'
                        placeholder='Your metadata publisher URL goes here...'
                        required
                        sx={{ width: 1, maxWidth: 500, mr: 2 }}
                    />
                    <Input id='password' label='Password' placeholder='Password' required />
                </Form>
            </WizardStepSubContent>

            <WizardStepSubContent title={title2} subTitle={subTitle2}>
                <Box sx={{ 'pt': 1, 'pl': 3, '& p': { mb: 2 } }}>
                    {instructionsList(instructions)}
                </Box>
            </WizardStepSubContent>

            <Box sx={{ maxWidth: 732, mt: 8, mx: 'auto' }}>
                <FileUploadForm onSelected={file => console.log(file)} validFileExtensions={['json']} />
            </Box>

            <Box sx={{ maxWidth: 732, mt: 8, mx: 'auto', color: 'error.main', display: 'flex' }}>
                <Icon icon='ErrorRounded' />
                <Typography sx={{ ml: 2 }}>
                    We are unable to authenticate your metadata publisher credentials.
                    Please double check your details or get additional help via <Link message='M3 Documentation' href='#' />.
                </Typography>
            </Box>
        </>
    );
};
