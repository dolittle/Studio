// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

/**
 * The props for a {@link PreformattedTextBlock} component.
 */
export type PreformattedTextBlockProps = {
    /**
     * The text to display in the preformatted text block.
     */
    text: string;
};

/**
 * The preformatted text block component is used to display a preformatted text block, like a code block.
 * @param {PreformattedTextBlockProps} props - The {@link PreformattedTextBlockProps}.
 * @returns A {@link PreformattedTextBlock} component.
 */
export const PreformattedTextBlock = ({ text }: PreformattedTextBlockProps) =>
    <Box sx={{ color: 'text.secondary', fontSize: 14, ml: 4 }}>
        <pre style={{ margin: '8px 0' }}>{text}</pre>
    </Box>;
