// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input, Switch } from '@dolittle/design-system';

type PublicUrlFieldProps = {
    disabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showPublicUrlInfo: boolean;
    sx: SxProps;
};

export const PublicUrlFields = ({ disabled, onChange, showPublicUrlInfo, sx }: PublicUrlFieldProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2'>Public Microservice</Typography>

        <Switch
            id='isPublic'
            label='Expose to a public URL'
            onChange={onChange}
            disabled={disabled}
        />

        {showPublicUrlInfo &&
            <Input
                id='ingressPath'
                label='Path'
                startAdornment='/'
                placeholder='leave blank for default path'
                disabled={disabled}
                dashedBorder
                sx={{ width: 226 }}
            />
        }
    </Box>;
