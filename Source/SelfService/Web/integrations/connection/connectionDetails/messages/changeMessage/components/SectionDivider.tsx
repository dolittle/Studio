// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Divider, DividerProps } from '@mui/material';

export const SectionDivider = (props: DividerProps) => {
    return (
        <Divider sx={{
            // mx: 1,
            borderColor: 'outlineborder',
        }} {...props} />
    );
};
