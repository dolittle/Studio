// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

import { AigonFixingSvg, MaxWidthTextBlock } from '@dolittle/design-system';

export const Building = () =>
    <Stack sx={{ p: 4, alignItems: 'center', textAlign: 'center' }}>
        <MaxWidthTextBlock variant='h1'>Aigon is currently improving this page.</MaxWidthTextBlock>
        <MaxWidthTextBlock variant='h5' sx={{ mt: 2 }}>We apologize for the inconvenience.</MaxWidthTextBlock>
        <MaxWidthTextBlock sx={{ my: 4 }}>Please give us a few hours to get this page up and running again.</MaxWidthTextBlock>
        <AigonFixingSvg sx={{ width: 1, maxWidth: 300, height: 'auto' }} />
    </Stack>;
