// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, SxProps } from '@mui/material';

type DataGridWrapperProps = {
    children: React.ReactNode;
    sx?: SxProps;
};

export const DataGridWrapper = ({ children, sx }: DataGridWrapperProps) =>
    <Paper elevation={1} sx={{ width: 1, boxShadow: 'none', ...sx }}>
        {children}
    </Paper>;
