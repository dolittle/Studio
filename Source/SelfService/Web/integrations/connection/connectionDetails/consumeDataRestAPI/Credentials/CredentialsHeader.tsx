// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { ContentDivider, Icon } from '@dolittle/design-system';

export const CredentialsHeader = () =>
    <>
        <ContentDivider />

        <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
            <Typography variant='subtitle2' sx={{ mr: 1 }}>Credentials</Typography>
            <Icon icon='InfoRounded' tooltipLabel='Generate new credentials to be used as credentials in apps connecting to the Rest API service.' />
        </Box>
    </>;
