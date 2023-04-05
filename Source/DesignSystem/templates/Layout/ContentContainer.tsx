// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';

export type ContentContainerProps = {
    children?: React.ReactNode;
};

export const ContentContainer = ({ children }: ContentContainerProps) =>
    <Paper sx={{ width: 1, my: 2, px: 2 }}>
        {children}
    </Paper>;
