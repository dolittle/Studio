// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Input, PasswordInput, MaxWidthTextBlock } from '@dolittle/design-system';
import { isValidUrl } from '../../../../../utils/validation/isValidUrl';

export type MetadataPublisherCredentialsProps = {
    canEdit: boolean;
};

export const MetadataPublisherCredentials = ({ canEdit }: MetadataPublisherCredentialsProps) => {
    const { watch } = useFormContext();
    const [metadataPublisherUrl, metadataPublisherPassword] = watch(['metadataPublisherUrl', 'metadataPublisherPassword']);

    const required = !!metadataPublisherUrl || !!metadataPublisherPassword;

    return (
        <>
            <MaxWidthTextBlock>
                This will allow us to access your service and provide the data, including custom data fields, needed to configure your application logic.
            </MaxWidthTextBlock>

            <Stack spacing={3.5} sx={{ mt: 3 }}>
                <Input
                    id='metadataPublisherUrl'
                    label='Your Metadata Publisher URL'
                    placeholder='Your metadata publisher URL goes here...'
                    sx={{ width: 1, maxWidth: 500 }}
                    required={{ value: required, message: 'Please enter your metadata publisher URL.' }}
                    disabled={!canEdit}
                    validate={(value) => required ? isValidUrl(value) || 'Please enter a valid URL.' : true}
                />
                <PasswordInput
                    id='metadataPublisherPassword'
                    label='Password'
                    placeholder='Your password'
                    required={{ value: required, message: 'Please enter the metadata publisher password.' }}
                    disabled={!canEdit}
                />
            </Stack>
        </>
    );
};
