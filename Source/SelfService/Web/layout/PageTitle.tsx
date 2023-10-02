// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

export type PageTitleProps = {
    title: string;
};

export const PageTitle = ({ title }: PageTitleProps) =>
    <Typography variant='h1' sx={{ mb: 4 }}>{title}</Typography>;
