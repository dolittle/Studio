// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { Button, TextField } from '@dolittle/design-system';

export type GeneratedCredentialsSectionProps = {
    token: string;
};

export const GeneratedCredentialsSection = ({ token }: GeneratedCredentialsSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleTokenCopy = () => {
        navigator.clipboard.writeText(token || '');
        enqueueSnackbar('Token copied to clipboard.');
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography sx={{ my: 2 }}>The token will only be visible one time after you generate it, so please make sure to copy it.</Typography>

            <Box sx={{ mt: 2 }}>
                <TextField value={token} isDisabled helperText='This bearer token should be used in the request header.' sx={{ width: 375 }} />
                <Button label='Copy Token' startWithIcon='CopyAllRounded' onClick={handleTokenCopy} sx={{ ml: 3 }} />
            </Box>
        </Box>
    );
};
