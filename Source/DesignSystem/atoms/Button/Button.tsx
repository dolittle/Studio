// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { Button as MuiButton, ExtendButtonBase, ButtonTypeMap, SvgIconProps, SxProps } from '@mui/material';

/**
 * The props for a {@link Button} component.
 */
export type ButtonProps = {
    /**
     * The text to display on the button.
     */
    label: string;

    /**
     * Buttons has four different variants.
     *
     * The `text` variant is the default variant.
     *
     * The `fullwidth` variant comes with custom styles and it takes up the entire width of its container.
     * @default text
     */
    variant?: 'text' | 'filled' | 'outlined' | 'fullwidth';

    /**
     * Buttons has seven different colors.
     *
     * The `primary` color is the default color.
     *
     * `subtle` color inherits the color of the parent element.
     * @default primary
     */
    color?: 'primary' | 'subtle' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

    /**
     * Add an icon to the start of the button.
     * @default undefined
     */
    startWithIcon?: ReactElement<SvgIconProps>;

    /**
     * Add an icon to the end of the button.
     * @default undefined
     */
    endWithIcon?: ReactElement<SvgIconProps>;

    /**
     * Set to `true` if button should take up the entire width of its container.
     * @default false
     */
    isFullWidth?: boolean;

    /**
     * Set to `true` if button should be disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * The type of the button.
     * @default button
     */
    type?: 'button' | 'submit' | 'reset';

    /**
     * Add a href to the button. If this is set, the button will be rendered as an anchor tag.
     * @default undefined
     */
    href?: string;

    /**
     * Set to `true` if button link should open in a new tab.
     *
     * Please also add meaningful text to the ariaLabel prop if you use target prop.
     * @default false
     */
    target?: boolean;

    /**
     * For accessibility, it is recommended to set aria-label to a meaningful string.
     * @default undefined
     */
    ariaLabel?: string;

    /**
     * The component to render button as.
     *
     * Use `span` if you want button styles, but element isn't really a button - like inside data tables.
     *
     * If you used the href prop, the component will automatically render as an anchor tag.
     * @default button
     */
    component?: 'button' | 'span' | 'a';

    /**
     * The `role='none'` combined with the `component='span'` is used currently to avoid password managers from detecting the button.
     * @default button
     */
    role?: 'button' | 'none';

    /**
     * Add event handler for button click.
     * @default undefined
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     * @default undefined
     */
    sx?: SxProps;

    /**
     * The overrides prop gives you access to the underlying MuiButtonProps object, overriding the styles defined by the component and Material-UI.
     * @default undefined
     */
    overrides?: Partial<ExtendButtonBase<ButtonTypeMap>>;
};

/**
 * The button component is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.
 * @param {ButtonProps} props - The {@link ButtonProps} that contains the properties for the button component.
 * @returns A {@link Button} component.
 */
export const Button = (
    { label, variant, color, startWithIcon, endWithIcon, isFullWidth, disabled, type, href, target, ariaLabel, component, role, onClick, sx, overrides }: ButtonProps) =>

    <MuiButton
        variant={variant === 'filled' ? 'contained' : variant}
        color={color === 'subtle' ? 'inherit' : color}
        startIcon={startWithIcon}
        endIcon={endWithIcon}
        fullWidth={isFullWidth}
        disabled={disabled}
        type={type}
        href={href}
        target={target ? '_blank' : undefined}
        aria-label={ariaLabel}
        component={component === 'span' ? 'span' : href ? 'a' : 'button'}
        role={role}
        onClick={onClick}
        sx={sx}
        rel={target ? 'noopener noreferrer' : undefined}
        disableFocusRipple
        {...overrides}
    >
        {label}
    </MuiButton>;
