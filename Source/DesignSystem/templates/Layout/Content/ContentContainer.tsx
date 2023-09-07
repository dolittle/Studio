// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, SxProps } from '@mui/material';

export type ContentContainerProps = {
    children?: React.ReactNode;
    sx?: SxProps;
};

export const ContentContainer = ({ sx, children }: ContentContainerProps) =>
    <Paper sx={{ width: 1, my: 2, px: 3, maxWidth: '1200px', ...sx }}>
        {children}
    </Paper>;
