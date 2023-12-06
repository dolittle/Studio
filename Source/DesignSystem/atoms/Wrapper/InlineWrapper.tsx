// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps } from '@mui/material';

/**
 * The props for a {@link InlineWrapper} component.
 */
export type InlineWrapperProps = {
    /**
     * The children of the inline wrapper.
     */
    children: React.ReactNode;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * An inline wrapper that displays content in a row with a gap of 8px.
 * @param {InlineWrapperProps} props - The {@link InlineWrapperProps}.
 * @returns A {@link InlineWrapper} component.
 */
export const InlineWrapper = ({ children, sx }: InlineWrapperProps) =>
    <Box component='section' sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
        {children}
    </Box>;
