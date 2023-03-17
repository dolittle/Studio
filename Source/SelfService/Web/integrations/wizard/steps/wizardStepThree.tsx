// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { Form, Input } from '@dolittle/design-system';

export const WizardStepThree = () =>
    <>
        <Typography variant='h4'>Almost there!</Typography>

        <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
                Please review the information below and provide a name for your connector. <br />
                Use the back button if you need to make changes.
            </Typography>
        </Box>

        <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
            <Typography variant='subtitle2' sx={{ mb: 2 }}>Connector name</Typography>

            <Form initialValues={{ connectorName: '' }}>
                <Input id='connectorName' label='Connector name' placeholder='Connector name' required />
            </Form>
        </Box>

        <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>Hosting</Typography>
            <Typography>On premise</Typography>
        </Box>

        <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>Meta Data Publisher Credentials</Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
                <Typography sx={{ mr: 1 }}>URL:</Typography>
                <Typography>this_is_your_mdp_url.m3</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 1 }}>Password:</Typography>
                <Typography>fake_password</Typography>
            </Box>
        </Box>

        <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>ION Service Account Credentials</Typography>
            <Typography>mock_m3_credentials.json</Typography>
        </Box>
    </>;
