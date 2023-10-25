// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { Input } from '@dolittle/design-system';

export type GenerateCredentialsProps = {
    hasResult: boolean;
    hasError: string | undefined;
};

export const GenerateCredentials = ({ hasResult, hasError }: GenerateCredentialsProps) =>
    <>
        <Typography sx={{ mb: 3 }}>
            The token will only be visible one time after you generate it, so please make sure to copy it. Who or what are these credentials for?
        </Typography>

        <Box sx={{ display: 'flex', mb: 6, gap: 1 }}>
            <Input id='name' label='Name' required disabled={hasResult && !hasError} sx={{ mr: 10 }} />
            <Input id='description' label='Description' disabled={hasResult && !hasError} />
        </Box>
    </>;
