// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { Button as MuiButton, SvgIconProps, SxProps } from '@mui/material';

/**
 * The props for a {@link Button} component.
 */
export type ButtonProps = {
    /**
     * Required. The text to display on the button.
     */
    label: string;

    /**
     * Button variants.
     *
     * The full-width variant comes with custom style and it takes up the entire width of its container.
     * @default text
     */
    variant?: 'text' | 'filled' | 'outlined' | 'fullwidth';

    /**
     * Button color.
     * @default primary
     */
    color?: 'primary' | 'subtle' | 'error' | 'info' | 'success' | 'warning';

    /**
     * Add an icon to the start of the button.
     * @default undefined
     * @type {ReactElement<SvgIconProps>}
     */
    startWithIcon?: ReactElement<SvgIconProps>;

    /**
     * Add an icon to the end of the button.
     * @default undefined
     * @type {ReactElement<SvgIconProps>}
     */
    endWithIcon?: ReactElement<SvgIconProps>;

    /**
     * Button can be full width.
     * @default false
     */
    isFullWidth?: boolean;

    /**
     * Button can be disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Button type. For submit buttons, use 'submit'. For reset buttons, use 'reset'.
     * @default button
     */
    type?: 'button' | 'submit' | 'reset';

    /**
     * Add a href to the button. If this is set, the button will be rendered as an anchor tag.
     * @default undefined
     */
    href?: string;

    /**
     * Use a target when linking to an external page.
     *
     * Please also add meaningful text to the ariaLabel prop.
     * @default false
     */
    target?: boolean;

    /**
     * For accessibility, it is recommended to set this value to a meaningful string rather than an empty string.
     * @default undefined
     */
    ariaLabel?: string;

    /**
     * The component to render as.
     *
     * If you used the href prop, the component will automatically render as an anchor tag.
     * @default button
     */
    component?: 'button' | 'span' | 'a';

    /**
     * The role='none' combined with the component='span' is a password managers browser extension hack that doesn't mess with the
     * button and slow down the page.
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
};

/**
 * A button component.
 * @param {...ButtonProps} props - The {@link ButtonProps}.
 * @returns {ReactElement} A new {@link Button} component.
 * @example
 * <Button label='Click me' variant='filled' isFullWidth startWithIcon={<AddCircle />} />
 */
export const Button = (
    { label, variant, color, startWithIcon, endWithIcon, isFullWidth, disabled, type, href, target, ariaLabel, component, role, onClick, sx }: ButtonProps): ReactElement =>

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
        disableElevation
        disableRipple
    >
        {label}
    </MuiButton>;
