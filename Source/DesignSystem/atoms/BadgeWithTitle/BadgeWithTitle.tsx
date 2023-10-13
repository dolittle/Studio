// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Badge, Box, Typography } from '@mui/material';

/**
 * The props for a {@link BadgeWithTitle} component.
 */
export type BadgeWithTitleProps = {
    /**
     * The number to display on the badge.
     *
     * If number is 0, the badge will be hidden.
     */
    number: number;

    /**
     * The title to display on the badge.
     */
    title: string;
};

/**
 * The badge with title component is used to display a badge with a title.
 * @param {BadgeWithTitleProps} props - The {@link BadgeWithTitleProps}.
 * @returns A {@link BadgeWithTitle} component.
 */
export const BadgeWithTitle = ({ number, title }: BadgeWithTitleProps) =>
    <Box sx={{ display: 'flex' }}>
        <Badge badgeContent={number} color='primary' sx={{ top: '12px', mr: 3, ml: 1 }} />
        <Typography variant='subtitle1'>{title}</Typography>
    </Box>;
