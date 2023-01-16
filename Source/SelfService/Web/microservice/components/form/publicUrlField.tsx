// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { SwitchToggle, Input, Tooltip } from '@dolittle/design-system';

type PublicUrlFieldProps = {
    hasPublicUrl: boolean;
    setHasPublicUrl?: (hasPublicUrl: boolean) => void;
    disabled?: boolean;
    tooltipTitle?: string;
    tooltipText?: string | React.ReactNode;
    sx?: SxProps;
};

export const PublicUrlField = ({ hasPublicUrl, setHasPublicUrl, disabled, tooltipTitle, tooltipText, sx }: PublicUrlFieldProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2'>Public Microservice</Typography>

        <SwitchToggle id='isPublic' label='Expose to a public URL' onChange={setHasPublicUrl} disabled={disabled} />

        {hasPublicUrl &&
            <Tooltip
                id='ingressPath'
                tooltipTitle={tooltipTitle}
                tooltipText={tooltipText}
            >
                <Input
                    id='ingressPath'
                    label='Path'
                    startAdornment='/'
                    placeholder='leave blank for default path'
                    disabled={disabled}
                    tooltipTitle={tooltipTitle}
                    tooltipText={tooltipText}
                    sx={{ width: 226 }}
                />
            </Tooltip>
        }
    </Box>;
