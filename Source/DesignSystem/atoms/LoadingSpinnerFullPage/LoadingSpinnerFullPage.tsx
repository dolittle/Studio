// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { createPortal } from 'react-dom';

import { Box, CircularProgressProps } from '@mui/material';

import { LoadingSpinner } from '../../index';

/**
 * The {@link LoadingSpinnerFullPage} component is used to display a loading spinner full page.
 * @param {LoadingSpinnerFullPage} props - The {@link CircularProgressProps}.
 * @returns A {@link LoadingSpinnerFullPage} component.
 */
export const LoadingSpinnerFullPage = (props: CircularProgressProps) =>
    createPortal(
        <Box sx={{ width: 1, height: 1, position: 'absolute', top: 0, left: 0, zIndex: '9999', backgroundColor: '#191A2150' }}>
            <LoadingSpinner {...props} />
        </Box>,
        document.body,
    );
