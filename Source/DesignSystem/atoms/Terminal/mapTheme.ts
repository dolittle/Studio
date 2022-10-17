// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ITerminalOptions } from 'xterm';

import { Theme } from '@mui/material';

/**
 * Maps a MUI theme to xterm.js terminal options.
 * @param theme The MUI {@link Theme} to use.
 * @returns The {@link ITerminalOptions} dictated by the theme.
 */
export const mapTheme = (theme: Theme): ITerminalOptions => {
    const font = theme.typography.body1;

    return {
        // fontFamily: font.fontFamily,
        // fontSize: fontSizeFrom(font.fontSize, theme.typography.htmlFontSize),
        // fontWeight: parseFloat(font.fontWeight as any) || parseFloat(theme.typography.fontWeightRegular as any) || undefined,
        // letterSpacing: 2,
        theme: {
            background: theme.palette.background.default,
        },
    };
};

const fontSizeFrom = (size: string | number | undefined, rem: number) => {
    if (size === undefined) {
        return rem;
    }

    if (typeof size === 'number') {
        return size;
    }

    if (size.endsWith('em')) {
        return parseFloat(size) * rem;
    }

    return parseFloat(size) ?? rem;
};
