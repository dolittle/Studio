// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { Icon, IconButton } from '../../index';

export type AigonHelperProps = {
    onClick: () => void;
};

export const AigonHelper = ({ onClick }: AigonHelperProps) =>
    <Box sx={{ display: 'flex' }}>
        <Icon icon='InfoRounded' color='primary' tooltipLabel='I am Aigon, your AI Assistant. I come with all the powers and flaws of AI tools.' sx={{ mt: -1, mr: -1 }} />
        <IconButton tooltipText='Turn on AI-assisted search' icon='AigonIcon' size='medium' onClick={onClick} sx={{ '& svg': { width: '34px', height: '34px' } }} />
    </Box>;
