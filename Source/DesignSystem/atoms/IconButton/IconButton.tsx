// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler } from 'react';

import { IconButton as MuiIconButton } from '@mui/material';

import { SvgIcons, SvgIconsDefinition } from '@dolittle/design-system';

/**
 * The props for a {@link IconButton} component.
 */
export type IconButtonProps = {
    /**
     * The aria-label of the icon button.
     *
     * For accessibility, it is recommended to set this value to a meaningful string.
     */
    ariaLabel: string;

    /**
     * The icon to show. Usual MUI icon, but write it as a string. Must be a valid `SvgIconsDefinition`.
     *
     * @param type {@link SvgIconsDefinition}.
     *
     * @default CloseRounded
     */
    icon: SvgIconsDefinition['icon'];

    /**
     * Most icons will use the default `inherit` color.
     *
     * `primary` color can be used for the important actions, such as Save, Submit, or Continue.
     * @default inherit
     */
    color?: 'inherit' | 'primary';

    /**
     * You can change icon size to be `medium`.
     * @default small
     */
    size?: 'small' | 'medium';

    /**
     * Set icon button to be start or end edge.
     * @default false
     */
    edge?: 'start' | 'end' | false;

    /**
     * Set to `true` if button should be disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Use it for navigate to internal page.
     *
     * When `href` is set, the component will render as an `a` element.
     * @default undefined
     */
    href?: string;

    /**
     * Use for downloading a file as a attr-download.
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
 * The icon button component is used to perform an action.
 * @param {IconButtonProps} props - The {@link IconButtonProps} that contains the properties for the confirm dialog.
 * @returns A {@link IconButton} component.
 */
export const IconButton = ({ ariaLabel, icon, color, size = 'small', edge, disabled, href, download, onClick }: IconButtonProps) => {
    const clonedIcon = React.cloneElement(
        icon ? SvgIcons[icon] : SvgIcons.CloseRounded, { fontSize: size }
    );

    return (
        <MuiIconButton
            aria-label={ariaLabel}
            color={color ?? 'inherit'}
            size={size}
            edge={edge ?? false}
            disabled={disabled}
            component={href ? 'a' : 'button'}
            href={href}
            download={download}
            onClick={onClick}
        >
            {clonedIcon}
        </MuiIconButton>
    );
};
