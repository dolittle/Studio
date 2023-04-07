// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler } from 'react';

import { IconButton as MuiIconButton, SxProps, Tooltip } from '@mui/material';

import { SvgIcons, SvgIconsDefinition } from '@dolittle/design-system';

/**
 * The props for a {@link IconButton} component.
 */
export type IconButtonProps = {
    /**
     * The text that will be displayed as a tooltip when the user hovers over the icon button.
     *
     * It is also used as the `aria-label` for the icon button.
     * @default undefined
     */
    tooltipText?: string;

    /**
     * Usual MUI icon writen as a `string`. Must be a valid `SvgIconsDefinition`.
     *
     * Leave empty to use the default `'CloseRounded'` icon.
     *
     * List of available icons can be found in {@link SvgIcons}.
     *
     * @default CloseRounded
     */
    icon?: SvgIconsDefinition;

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
     * Set icon to be in the start edge or in the end edge.
     * @default false
     */
    edge?: 'start' | 'end' | false;

    /**
     * Set to `true` if button should be disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Use it to navigate to internal page.
     *
     * When `href` is set, the component will render as an `a` element.
     * @default undefined
     */
    href?: string;

    /**
     * Use it for downloading a file as a `attr-download`.
     * @default undefined
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download for more information.
     */
    download?: string;

    /**
     * Callback fired when the component is clicked.
     * @default undefined
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * The icon button component is used to perform an action.
 * @param {IconButtonProps} props - The {@link IconButtonProps}.
 * @returns A {@link IconButton} component.
 */
export const IconButton = ({ tooltipText, icon = 'CloseRounded', color, size = 'small', edge, disabled, href, download, onClick, sx }: IconButtonProps) => {
    const clonedIcon = React.cloneElement(SvgIcons[icon], { fontSize: size });

    return (
        <Tooltip title={tooltipText || ''} arrow placement='top'>
            <MuiIconButton
                color={color ?? 'inherit'}
                size={size}
                edge={edge ?? false}
                disabled={disabled}
                component={href ? 'a' : 'button'}
                href={href}
                download={download}
                onClick={onClick}
                aria-label={tooltipText}
                sx={sx}
            >
                {clonedIcon}
            </MuiIconButton>
        </Tooltip>
    );
};
