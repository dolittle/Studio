// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler, ReactElement } from 'react';

import { IconButton as MuiIconButton, SvgIconProps } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

export type IconButtonProps = {
    /**
     * Required. The aria-label of the icon button.
     *
     * For accessibility, it is recommended to set this value to a meaningful string rather than an empty string.
     */
    label: string;

    /**
     * Choose icon from @mui/icons-material or leave empty to use default 'close' icon.
     * @default <CloseRounded />
     */
    icon?: ReactElement<SvgIconProps>;

    /**
     * Most icons will use the default inherit styling.
     *
     * Secondary icon button use 'primary' color.
     *
     * They are used for the most important actions, such as Save, Submit, or Continue.
     * @default inherit
     */
    color?: 'inherit' | 'primary';

    /**
     * Set icon size to medium.
     * @default small
     */
    size?: 'small' | 'medium';

    /**
     * Icon button can be disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Navigate to internal page.
     *
     * When this is set, the component will render as an anchor element.
     * @default undefined
     */
    href?: string;

    /**
     * Download file.
     * @default undefined
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download for more information.
     */
    download?: string;

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
export const IconButton = ({ label, icon, color, size = 'small', disabled, href, download, onClick }: IconButtonProps): ReactElement =>
    <MuiIconButton
        aria-label={label}
        color={color || 'inherit'}
        size={size}
        disabled={disabled}
        component={href ? 'a' : 'button'}
        href={href}
        download={download}
        onClick={onClick}
    >
        {!icon ? <CloseRounded fontSize={size} /> : React.cloneElement(icon, { fontSize: size })}
    </MuiIconButton>;
