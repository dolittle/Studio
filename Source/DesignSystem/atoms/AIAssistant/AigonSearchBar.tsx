// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { alpha, InputAdornment } from '@mui/material';

import { Icon, IconButton, TextField } from '../../index';

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
        placeholder='Search with Aigon'
        isFullWidth
        overrides={{
            InputProps: {
                startAdornment:
                    <InputAdornment position='start'>
                        <Icon icon='Search' color='primary' />
                    </InputAdornment>,
                endAdornment:
                    <InputAdornment position='end'>
                        <IconButton tooltipText='Switch back to normal search.' icon='AigonIcon' edge='end' onClick={onAigonClose} />
                    </InputAdornment>,
            },
        }}
        sx={{ backgroundColor: theme => alpha(theme.palette.primary.main, 0.5) }}
    />;
