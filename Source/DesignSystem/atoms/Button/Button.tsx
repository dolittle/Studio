// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler, ReactElement } from 'react';

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
     * - fullwidth: Button with extra styling and take up the full width of its container.
     * @default text
     */
    variant?: 'filled' | 'text' | 'outlined' | 'fullwidth';

    color?: 'primary' | 'secondary' | undefined;

    /**
     * Button can be disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Set secondary button color.
     *
     * Secondary button are reserved for less-pronounced actions, including those found in dialogs, cards,
     * and data charts and can include action items such as ‘learn more’ or ‘cancel’.
     *
     * Default primary button are for high emphasis and primary actions, such as a save button or a next button in a form.
     * @default false
     */
    secondary?: boolean;

    /**
     * Set button size.
     * @default small
     */
    size?: 'small' | 'medium';

    /**
     * Add an icon to the start of the button. Support only React SVG icons.
     * @default undefined
     * @type {ReactElement<SvgIconProps>}
     */
    startWithIcon?: ReactElement<SvgIconProps>;

    /**
     * Add an icon to the end of the button. Support only React SVG icons.
     * @default undefined
     * @type {ReactElement<SvgIconProps>}
     */
    endWithIcon?: ReactElement<SvgIconProps>;

    /**
     * Button type. Default is button but for example if you want to use the button as a submit button you can set it to submit.
     * @default button
     */
    type?: 'button' | 'submit' | 'reset';

    /**
     * Add event handler for when the button is clicked.
     * @default undefined
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /**
     * Add a href to the button. If this is set the button will be rendered as an anchor tag.
     */
    href?: string;

    /**
     * Use with external links.
     *
     * Set target to 'true' if you want the link to open in a new tab.
     * @default false
     */
    target?: boolean;

    /**
     * Role of the button. Default is button but for example if you want to use the button as a link you can set it to link.
     *
     * Role 'none' combined with component='span' is a hack for Dashlane browser extension to not interfere with the button
     * and slow down the page.
     * @default button
     */
    role?: 'button' | 'none';
    component?: 'button' | 'span' | 'a';

    /**
     * Add custom styling to the button.
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
    { label, variant, disabled, color, size, startWithIcon, endWithIcon, role, type, component, href, target, onClick, sx }: ButtonProps): ReactElement =>

    <MuiButton
        variant={variant === 'filled' ? 'contained' : variant}
        color={color}
        size={size}
        startIcon={startWithIcon}
        endIcon={endWithIcon}
        type={type}
        href={href}
        target={target ? '_blank' : undefined}
        component={component === 'span' ? 'span' : href ? 'a' : 'button'}
        role={role}
        onClick={onClick}
        disabled={disabled}
        sx={sx}
        disableElevation
    >
        {label}
    </MuiButton>;
