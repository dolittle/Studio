// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Paper } from '@mui/material';

export type CardPageProps = {
    children?: React.ReactNode;
};


export const CardPage = ({ children }: CardPageProps) => {
    return (
        <Paper sx={{ width: 1, mt: 2 }}>
            {children}
        </Paper>
    );
};
