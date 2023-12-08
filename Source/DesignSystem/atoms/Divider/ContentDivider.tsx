// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Divider, DividerProps } from '@mui/material';

/**
 * The props for a {@link ContentDivider} component.
 */
export type ContentDividerProps = DividerProps;

/**
 * The {@link ContentDivider} component is a divider with a custom border color.
 * @param {ContentDividerProps} props - The {@link ContentDividerProps}.
 * @returns A {@link ContentDivider} component.
 */
export const ContentDivider = ({ sx, ...props }: ContentDividerProps) =>
    <Divider sx={{ borderColor: 'outlineborder', ...sx }} {...props} />;
