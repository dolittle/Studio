// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { FileUploadForm, Form, Icon, Input, Link } from '@dolittle/design-system';

export const WizardStepTwo = () => {
    const [stepError, setStepError] = useState(false);

    return (
        <>
            <Typography variant='h4'>Now it’s time to setup your credentials</Typography>

            <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
                <Typography variant='subtitle2' sx={{ mb: 1 }}>1. Provide your metadata publisher credentials</Typography>

                <Typography>
                    This will allow us to access your service and provide the data needed to configure your application logic.
                </Typography>

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
            </Box>

            <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
                <Typography variant='subtitle2' sx={{ mb: 1 }}>2. Setup ION service account and upload credentials</Typography>

                <Typography sx={{ mb: 2 }}>
                    Follow the steps below then upload your credentials. If you already have an ION service account
                    setup, skip to step 8 to access your credentials.
                </Typography>

                <Box sx={{ 'pl': 3, '& p': { mb: 2 } }}>
                    <Typography>
                        1. Open Infor ION API. Open the menu from the upper left corner and select ‘Infor ION API’.
                    </Typography>
                    <Typography>
                        2. Select ‘Authorized Apps’ from the left hand menu followed by the ‘+’ icon to add a new account.
                    </Typography>
                    <Typography>
                        3. Provide a name. Example: “Dolittle_Bridge”.
                    </Typography>
                    <Typography>
                        4. Under ‘Type’, select ‘Backend Service’.
                    </Typography>
                    <Typography>
                        6. Toggle on ‘Use Bridge Authentication. Optional: You can toggle on ‘User Impersonation’
                        if you would like to monitor specific user activity.
                    </Typography>
                    <Typography>
                        7. Click the save icon button.
                    </Typography>
                    <Typography>
                        8. Scroll down and click ‘Download Credentials’ button. If you would like to use an account
                        you’ve previously created, you can access the account via ‘Authorized Apps’ then selecting the account name.
                    </Typography>
                    <Typography>
                        9. When the dialog pops up, toggle on ‘Create Service Account’ and provide a username from your M3
                        account you would like to associate with the ION service account.
                    </Typography>
                    <Typography>
                        10. Last, click ‘Download’. Upload the files below.
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ maxWidth: 732, mt: 8, mx: 'auto' }}>
                <FileUploadForm onSelected={file => console.log(file)} validFileExtensions={['json']} />
            </Box>

            {/* <Box sx={{ maxWidth: 732, mt: 8, mx: 'auto', color: 'text.secondary', display: 'flex' }}>
                <CircularProgress color='inherit' size={20} />
                <Typography sx={{ ml: 2 }}>Waiting for credential authentication...</Typography>
            </Box> */}

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
