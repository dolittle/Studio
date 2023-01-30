// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { Link as MuiLink } from '@mui/material';

/**
 * The props for a {@link Link} component.
 */
type LinkProps = {
    /**
     * Required. The URL to link to.
     */
    href: string;

    /**
     * Mark this as 'true' if the link opens in a new window or browser tab.
     *
     * Also add an aria-label to inform screen reader users.
     * @default false
     */
    target?: boolean;

    /**
     *  If the link opens in a new window or browser tab, add an aria-label to inform screen reader users.
     * @default undefined
     */
    ariaLabel?: string;

    /**
     * The color of the link.
     * @default primary
     */
    color?: 'primary' | 'secondary' | 'text.primary' | 'text.secondary' | 'error';

    /**
     * Required. The text to display in the component.
     */
    message: string;
};

/**
 * A Link component.
 * @param {...LinkProps} props - The {@link LinkProps}.
 * @returns {ReactElement} A new {@link Link} component.
 * @example
 * <Link href='https://dolittle.io' message='Dolittle' ariaLabel='To learn more, visit our website which opens in a new window.' />
 */
export const Link = ({ href, ariaLabel, target, color, message }: LinkProps): ReactElement =>
    <MuiLink
        color={color}
        href={href}
        aria-label={ariaLabel}
        target={target ? '_blank' : undefined}
        rel='noreferrer'
        fontSize='inherit'
        underline='hover'
        sx={{ '&:hover': { opacity: 0.8 } }}
    >
        {message}
    </MuiLink>;
