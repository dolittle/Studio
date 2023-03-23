// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

import { Form, Input } from '@dolittle/design-system';

type MetadataPublisherParameters = {
    metadataPublisher: string;
    password: string;
};

export const MetadataPublisherForm = () =>
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
            <Input id='password' label='Password' placeholder='Your password' required />
        </Stack>
    </Form>;
