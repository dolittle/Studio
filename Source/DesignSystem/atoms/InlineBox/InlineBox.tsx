// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps } from '@mui/material';

/**
 * The props for a {@link InlineBox} component.
 */
export type InlineBoxProps = {
    /**
     * The children of the inline box.
     */
    children: React.ReactNode;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * A sub-component box that renders an inline box with a gap of 8px.
 * @param {InlineBoxProps} props - The {@link InlineBoxProps}.
 * @returns A {@link InlineBox} component.
 */
export const InlineBox = ({ children, sx }: InlineBoxProps) =>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
        {children}
    </Box>;
