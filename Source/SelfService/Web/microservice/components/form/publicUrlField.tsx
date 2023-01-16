// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { SwitchToggle, Input, Tooltip } from '@dolittle/design-system';

type PublicUrlFieldProps = {
    hasPublicUrl: boolean;
    setHasPublicUrl?: (hasPublicUrl: boolean) => void;
    disabled?: boolean;
    tooltipUrlFieldTitle?: string;
    tooltipUrlFieldText?: string | React.ReactNode;
    sx?: SxProps;
};

export const PublicUrlField = ({ hasPublicUrl, setHasPublicUrl, disabled, tooltipUrlFieldTitle, tooltipUrlFieldText, sx }: PublicUrlFieldProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2'>Public Microservice</Typography>

        <SwitchToggle id='isPublic' label='Expose to a public URL' onChange={setHasPublicUrl} disabled={disabled} />

        {hasPublicUrl ? (tooltipUrlFieldTitle && tooltipUrlFieldText) ?
            <Tooltip id='public-url-tooltip' tooltipTitle={tooltipUrlFieldTitle} tooltipText={tooltipUrlFieldText}>
                <Input
                    id='ingressPath'
                    label='Path'
                    startAdornment='/'
                    placeholder='leave blank for default path'
                    disabled={disabled}
                    sx={{ width: 226 }}
                />
            </Tooltip> :
            <Input
                id='ingressPath'
                label='Path'
                startAdornment='/'
                placeholder='leave blank for default path'
                disabled={disabled}
                sx={{ width: 226 }}
            />
            : null
        }
    </Box>;
