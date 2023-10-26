// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { Input } from '@dolittle/design-system';

export type GenerateCredentialsProps = {
    hasResult: boolean;
};

export const GenerateCredentials = ({ hasResult }: GenerateCredentialsProps) =>
    <Box sx={{ mt: 3 }}>
        <Typography sx={{ my: 2 }}>Who or what are these credentials for?</Typography>

        <Input id='name' label='Name' required disabled={hasResult} sx={{ mr: 10 }} />
        <Input id='description' label='Description' disabled={hasResult} />
    </Box>;
