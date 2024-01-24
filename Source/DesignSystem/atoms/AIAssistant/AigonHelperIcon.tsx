// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { Icon, IconButton } from '../../index';

/**
 * The props for a {@link AigonHelperIcon} component.
 */
export type AigonHelperIconProps = {
    /**
     * Callback for when the user clicks the Aigon helper icon.
     */
    onAigonActivate: () => void;
};

/**
 * A search bar that can be used to search with open AI.
 * @param {AigonHelperIconProps} props - The {@link AigonHelperIconProps}.
 * @returns A {@link AigonHelperIcon} component.
 */
export const AigonHelperIcon = ({ onAigonActivate }: AigonHelperIconProps) =>
    <Box sx={{ display: 'flex' }}>
        <Icon icon='InfoRounded' color='primary' tooltipLabel='I am Aigon, your AI Assistant. I come with all the powers and flaws of AI tools.' sx={{ mt: -1, mr: -1 }} />
        <IconButton tooltipText='Try AI-assisted search' icon='AigonIcon' size='medium' onClick={onAigonActivate} sx={{ '& svg': { width: '34px', height: '34px' } }} />
    </Box>;
