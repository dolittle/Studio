// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ITerminalOptions } from 'xterm';

import { Theme } from '@mui/material';

/**
 * Maps a MUI theme to xterm.js terminal options.
 * @param theme The MUI {@link Theme} to use.
 * @returns The {@link ITerminalOptions} dictated by the theme.
 */
export const mapTheme = (theme: Theme): ITerminalOptions => {
    return {
        theme: {
            background: theme.palette.background.default,
        },
    };
};
