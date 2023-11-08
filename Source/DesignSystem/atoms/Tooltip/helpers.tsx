// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

export type TooltipTitleProps = {
    title: string;
    description: string | React.ReactNode;
};

export const TooltipTitle = ({ title, description }: TooltipTitleProps) =>
    <>
        <Typography variant='body2' sx={{ fontWeight: 700, textTransform: 'uppercase' }}>{title}</Typography>
        <Typography variant='body2'>{description}</Typography>
    </>;
