// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { alpha } from '@mui/material';

import { IconButton, TextField } from '../../index';

/**
 * The props for a {@link AigonSearchBar} component.
 */
export type AigonSearchBarProps = {
    /**
     * Callback for when the user clicks the Aigon icon.
     */
    onAigonClose: () => void;
};

/**
 * A search bar that can be used to search with open AI.
 * @param {AigonSearchBarProps} props - The {@link AigonSearchBarProps}.
 * @returns A {@link AigonSearchBar} component.
 */
export const AigonSearchBar = ({ onAigonClose }: AigonSearchBarProps) =>
    <TextField
        id='aigon-search-bar'
        label='Search with Aigon'
        isFullWidth
        overrides={{
            InputProps: {
                endAdornment:
                    <IconButton tooltipText='Switch back to normal search.' icon='AigonIcon' size='medium' edge='end' onClick={onAigonClose} />,
            },
        }}
        sx={{ backgroundColor: theme => alpha(theme.palette.primary.main, 0.5) }}
    />;
