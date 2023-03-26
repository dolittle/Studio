// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

import { Input } from '@dolittle/design-system';

import { MaxWidthTextBlock } from './MaxWidthTextBlock';

export const MetadataPublisherCredentials = () =>
    <>
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
    </>;
