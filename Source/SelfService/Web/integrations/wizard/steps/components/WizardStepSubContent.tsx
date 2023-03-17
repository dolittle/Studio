// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

type WizardStepSubContentProps = {
    title: string;
    subTitle?: string;
    children?: React.ReactNode;
    sx?: SxProps;
};

export const WizardStepSubContent = ({ title, subTitle, children, sx }: WizardStepSubContentProps) =>
    <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto', ...sx }}>
        <Typography variant='subtitle2' sx={{ mb: 1 }}>{title}</Typography>
        <Typography>{subTitle}</Typography>
        {children}
    </Box>;
