// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Input, PasswordInput, MaxWidthTextBlock } from '@dolittle/design-system';
import { isValidUrl } from '../../../../utils/validation/isValidUrl';

export type M3BasicAuthenticationCredentialsProps = {
    canEdit: boolean;
};

export const M3BasicAuthenticationCredentials = ({ canEdit }: M3BasicAuthenticationCredentialsProps) => {
    const { watch } = useFormContext();
    const [
        basicConfigurationHost,
        basicConfigurationUsername,
        basicConfigurationPassword
    ] = watch([
        'basicConfiguration.host',
        'basicConfiguration.username',
        'basicConfiguration.password'
    ]);

    const required = !!basicConfigurationHost || !!basicConfigurationUsername || !!basicConfigurationPassword;

    return (
        <>
            <MaxWidthTextBlock>
                Provide these credentials to give the connector access to the data within Infor M3.
            </MaxWidthTextBlock>

            <Stack spacing={3.5} sx={{ mt: 3 }}>

                <Input
                    id='basicConfiguration.username'
                    label='M3 Username'
                    placeholder='Your M3 username goes here...'
                    disabled={!canEdit}
                    required={{ value: required, message: 'Please enter the M3 username.' }}
                />
                <PasswordInput
                    id='basicConfiguration.password'
                    label='M3 Password'
                    placeholder='Your password'
                    disabled={!canEdit}
                    required={{ value: required, message: 'Please enter the M3 password.' }}
                />
                <Input
                    id='basicConfiguration.host'
                    label='M3 Host URL'
                    placeholder='Your M3 Host URL goes here...'
                    sx={{ width: 1, maxWidth: 500 }}
                    disabled={!canEdit}
                    required={{ value: required, message: 'Please enter the M3 Host URL.' }}
                    validate={(value) => required ? isValidUrl(value) || 'Please enter a valid URL.' : true}
                />
            </Stack>
        </>
    );
};
