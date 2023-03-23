// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography, TypographyProps } from '@mui/material';

export type MaxWidthTextBlockProps = Partial<TypographyProps>;

export const MaxWidthTextBlock = (props: MaxWidthTextBlockProps) =>
    <Typography sx={{ maxWidth: 660 }} {...props} />;
