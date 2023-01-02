// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { Button } from '@dolittle/design-system'

export const ActionButtons = () =>
    <Box sx={{ mt: 12.5 }}>
        <Button label='Back to tenant' secondary startWithIcon={<ArrowBack />} href='/.auth/cookies/initiate' sx={{ mr: 8 }} />
        <Button label='Log out' secondary href='/.auth/cookies/logout' />
    </Box>;
