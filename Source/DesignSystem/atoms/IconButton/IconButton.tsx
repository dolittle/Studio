// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler } from 'react';

import { ButtonTypeMap, ExtendButtonBase, IconButton as MuiIconButton, SxProps } from '@mui/material';

import { Icon, SvgIcons, SvgIconsDefinition, Tooltip } from '../../index';

/**
 * The props for a {@link IconButton} component.
 */
export type IconButtonProps = {
    /**
     * The text that will be displayed as a tooltip when the user hovers over the icon button.
     *
     * It is also used as the `aria-label` for the icon button.
     */
    tooltipText: string;

    /**
     * The placement of the tooltip.
     * @default top
     */
    tooltipPlacement?: 'right' | 'top';

    /**
     * Usual MUI icon written as a `string`. Must be a valid `SvgIconsDefinition`.
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
     * @default inherit
     */
    color?: 'inherit' | 'primary';

    /**
     * You can change icon size to be `medium`.
     * @default small
     */
    size?: 'small' | 'medium';

    /**
     * Use it to change the position of the icon.
     * @default false
     */
    edge?: 'start' | 'end';

    /**
     * Use it to disable the icon button.
     * @default false
     */
    disabled?: boolean;

    /**
     * Use it to navigate to internal page.
     *
     * When href is set, the component will render as an `a` element.
     */
    href?: string;

    /**
     * Use it for downloading a file as a `attr-download`.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download for more information.
     */
    download?: string;

    /**
     * The event handler for the `onClick` event.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;

    /**
     * Override or extend the styles applied to the component.
     */
    overrides?: Partial<ExtendButtonBase<ButtonTypeMap>>; // TODO: How to extend the type here?
};

/**
 * The icon button component is used to perform an action.
 * @param {IconButtonProps} props - The {@link IconButtonProps}.
 * @returns A {@link IconButton} component.
 */
export const IconButton = ({ tooltipText, tooltipPlacement, icon, color, size, edge, disabled, href, download, onClick, sx, overrides }: IconButtonProps) =>
    <Tooltip title={tooltipText || ''} placement={tooltipPlacement ?? 'top'}>
        <MuiIconButton
            color={color ?? 'inherit'}
            size={size ?? 'small'}
            edge={edge ?? false}
            disabled={disabled}
            component={href ? 'a' : 'button'}
            href={href}
            download={download}
            onClick={onClick}
            aria-label={tooltipText}
            sx={sx}
            {...overrides}
        >
            <Icon icon={icon ?? 'CloseRounded'} size={size ?? 'small'} />
        </MuiIconButton>
    </Tooltip>;
