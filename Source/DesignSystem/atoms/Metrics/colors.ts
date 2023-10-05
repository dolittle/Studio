// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useMemo } from 'react';
import { useTheme, Theme } from '@mui/material';

/**
 * Defines an array of Colors that can be used as a 'repeating array' to assign colors to a list of something.
 */
export interface ColorScheme {
    /*
     * Gets the color for a given index. When the index is higher than the lenght, it wraps around.
     */
    [index: number]: string;

    /**
     * Gets the number of colors defined in the color scheme.
     */
    readonly length: number;

    /**
     * Gets the iterator of all the colors defined in the color scheme.
     */
    [Symbol.iterator](): IterableIterator<string>;
};

/**
 * Creates a new {@link ColorScheme} from the provided colors.
 * @param color The first color of the {@link ColorScheme} to create.
 * @param colors The rest of the colors of the {@link ColorScheme} to create.
 * @returns A new {@link ColorScheme} of the provided colors.
 */
export const colorScheme = (color: string, ...colors: string[]): ColorScheme => {
    return new Proxy(
        [color, ...colors],
        {
            get(target, property, receiver) {
                const index = parseInt(property.toString());
                if (index.toString() === property && index >= 0) {
                    return target[index % target.length];
                }

                return Reflect.get(target, property, receiver);
            },
        }
    );
};

/**
 * Creates a {@link ColorScheme} from a provided MUI {@link Theme}.
 * @param theme The {@link Theme} to create a {@link ColorScheme} from.
 * @returns The {@link ColorScheme} created form the provided {@link Theme}.
 */
export const colorSchemeFrom = (theme: Theme): ColorScheme =>
    colorScheme(
        theme.palette.primary.dark,
        theme.palette.secondary.dark,
    );

/**
 * Gets the a {@link ColorScheme} created from the current MUI {@link Theme} in use.
 * @returns The {@link ColorScheme} created from the current {@link Theme}.
 */
export const useThemeColorScheme = (): ColorScheme => {
    const theme = useTheme();
    return useMemo(() => colorSchemeFrom(theme), [theme]);
};
