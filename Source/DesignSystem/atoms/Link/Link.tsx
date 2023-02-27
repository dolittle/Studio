// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link as MuiLink } from '@mui/material';

/**
 * The props for a {@link Link} component.
 */
export type LinkProps = {
    /**
     * The URL to link to.
     */
    href: string;

    /**
     * Mark this as `true` if the link opens in a new window or browser tab.
     *
     * Also add an aria-label to inform screen reader users.
     * @default false
     */
    target?: boolean;

    /**
     *  If the link opens in a new window or browser tab, add an `ariaLabel` to inform screen reader users.
     * @default undefined
     */
    ariaLabel?: string;

    /**
     * The color of the link.
     * @default primary
     */
    color?: 'primary' | 'subtle' | 'secondary';

    /**
     * Link text to display.
     */
    message: string;
};

/**
 * The link component is used to navigate to a different page or to a different part of the current page.
 * @param {LinkProps} props - The {@link LinkProps} that contains the properties for the link component.
 * @returns A {@link Link} component.
 */
export const Link = ({ href, ariaLabel, target, color, message }: LinkProps) =>
    <MuiLink
        color={color === 'subtle' ? 'text.primary' : color}
        href={href}
        aria-label={ariaLabel}
        target={target ? '_blank' : undefined}
        rel={target ? 'noopener noreferrer' : undefined}
        fontSize='inherit'
        sx={{ '&:hover': { opacity: 0.9 } }}
    >
        {message}
    </MuiLink>;
