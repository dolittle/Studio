// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { Button } from '@dolittle/design-system';

export const ActionButtons = () =>
    <Box sx={{ my: 5 }}>
        <Button
            label='Save connection'
            //disabled
            type='submit'
            sx={{ mr: 3 }}
        />

        <Button
            label='Start Mapping Data'
            variant='filled'
            disabled
            href='#'
        />
    </Box>;
