// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, BoxProps } from '@mui/material';

export type MaxWidthBlockProps = Partial<BoxProps>;

/**
 * Max width div block
 * @returns return a Box component as a div with max width
 */
export const MaxWidthBlock = ({ sx, ...props }: MaxWidthBlockProps) =>
    <Box sx={{ maxWidth: 660, ...sx }} {...props} />;
