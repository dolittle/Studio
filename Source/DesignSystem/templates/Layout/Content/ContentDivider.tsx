// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Divider, DividerProps } from '@mui/material';

export type ContentDividerProps = DividerProps;

export const ContentDivider = ({ sx, ...props }: ContentDividerProps) =>
    <Divider sx={{ borderColor: 'outlineborder', ...sx }} {...props} />;
