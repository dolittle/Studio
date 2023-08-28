// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Input, PasswordInput, MaxWidthTextBlock } from '@dolittle/design-system';

export type M3BasicAuthenticationCredentialsProps = {
    canEdit: boolean;
};

export const M3BasicAuthenticationCredentials = ({ canEdit }: M3BasicAuthenticationCredentialsProps) => {
    const { watch } = useFormContext();

    return (
        <>
            <MaxWidthTextBlock>
                Provide these credentials to give the connector access to the data within Infor M3.
            </MaxWidthTextBlock>

            <Stack spacing={3.5} sx={{ mt: 3 }}>

            </Stack>
        </>
    );
};
