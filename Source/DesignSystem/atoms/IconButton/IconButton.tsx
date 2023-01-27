// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler, ReactElement } from 'react';

import { IconButton as MuiIconButton, SvgIconProps } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

export type IconButtonProps = {
    /**
     * The aria-label of the icon button.
     *
     * For accessibility, it is recommended to set this value to a meaningful string rather than an empty string.
     */
    label?: string;

    /**
     * Choose icon from @mui/icons-material or leave empty to use default 'close' icon.
     * @default <CloseRounded />
     */
    icon?: ReactElement<SvgIconProps>;

    /**
     * Most icons will use the default inherit styling.
     *
     * Secondary icons use 'primary' color.
     *
     * They are used for the most important actions, such as Save, Submit, or Continue.
     * @default inherit
     */
    color?: 'inherit' | 'primary';

    /**
     * Set icon size.
     * @default small
     */
    size?: 'small' | 'medium';

    /**
     * Add link to internal navigation.
     * @default undefined
     */
    href?: string;

    /**
     * Icon can be disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Callback fired when the component is clicked.
     * @default undefined
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

/**
 * A icon button component.
 * @param {...IconButtonProps} props - The {@link IconButtonProps}.
 * @returns {ReactElement} A new {@link IconButton} component.
 * @example
 * <IconButton label="Download" icon={<DownloadRounded />} />
 */
export const IconButton = ({ label, icon, color, size = 'small', href, disabled, onClick }: IconButtonProps): ReactElement =>
    <MuiIconButton
        aria-label={!icon ? 'Close' : label}
        color={color || 'inherit'}
        size={size}
        // @ts-ignore
        href={href}
        disabled={disabled}
        onClick={onClick}
    >
        {!icon ? <CloseRounded fontSize={size} /> : React.cloneElement(icon, { fontSize: size })}
    </MuiIconButton>;
