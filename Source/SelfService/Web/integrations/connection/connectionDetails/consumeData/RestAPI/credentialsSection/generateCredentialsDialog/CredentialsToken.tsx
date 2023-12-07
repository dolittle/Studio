// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { Button, TextField } from '@dolittle/design-system';

export type CredentialsTokenProps = {
    token: string;
};

export const CredentialsToken = ({ token }: CredentialsTokenProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleTokenCopy = () => {
        navigator.clipboard.writeText(token || '');
        enqueueSnackbar('Token copied to clipboard.');
    };

    return (
        <>
            <Typography>The token will only be visible one time after you generate it, so please make sure to copy it.</Typography>

            <section>
                <TextField value={token} isDisabled helperText='This bearer token should be used in the request header.' sx={{ width: 375 }} />
                <Button label='Copy Token' startWithIcon='CopyAllRounded' onClick={handleTokenCopy} sx={{ ml: 3 }} />
            </section>
        </>
    );
};
