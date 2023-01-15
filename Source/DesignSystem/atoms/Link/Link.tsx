// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { Link as MuiLink } from '@mui/material';

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
     * Mark this as 'true' if the link should be displayed in a subtle way.
     *
     * This is useful for links that are not the main focus of the page.
     *
     * The link will be displayed in secondary text color.
     * @default false
     */
    subtle?: boolean;

    /**
     * Required. The text to display in the component.
     */
    message: string;
};

/**
 * A Link component.
 * @param {...LinkProps} props - The {@link LinkProps}.
 * @returns {ReactElement} A new {@link Link} component.
 */
export const Link = ({ href, ariaLabel, target, subtle, message }: LinkProps): ReactElement =>
    <MuiLink
        color={subtle ? 'text.secondary' : 'primary'}
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
