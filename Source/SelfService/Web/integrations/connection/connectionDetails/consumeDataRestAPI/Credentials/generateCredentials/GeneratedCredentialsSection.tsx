// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, FormHelperText, Typography } from '@mui/material';

import { Button, Input } from '@dolittle/design-system';

export type GeneratedCredentialsSectionProps = {
    onTokenCopy: () => void;
};

export const GeneratedCredentialsSection = ({ onTokenCopy }: GeneratedCredentialsSectionProps) =>
    <>
        <Typography>Credential Token</Typography>

        <Box sx={{ mt: 2 }}>
            <Input id='token' label='Token' disabled sx={{ width: 375 }} />
            <Button label='Copy Token' startWithIcon='CopyAllRounded' onClick={onTokenCopy} sx={{ ml: 3 }} />
        </Box>

        <FormHelperText sx={{ ml: 1.75 }}>This bearer token should be used in the request header.</FormHelperText>
    </>;
