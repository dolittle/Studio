// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { MouseEventHandler, ReactElement } from 'react';

import { Button as MuiButton, SvgIconProps, SxProps } from '@mui/material';
import { ErrorRounded } from '@mui/icons-material';

export type ButtonProps = {
    /**
     * Required. The text to display on the button.
     */
    label: string;

    /**
     * Button variants.
     *
     * - fullwidth: Button with extra styling and take up the full width of its container.
     * - danger: Danger buttons are seldom used and reserved for cases where the primary action is destructive such as deleting content.
     * @default text
     */
    variant?: 'filled' | 'text' | 'outlined' | 'fullwidth' | 'danger';

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
    size?: 'small' | 'large';

    /**
     * Button that takes up the full width of its container.
     * @default false
     */
    isFullWidth?: boolean;

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
     *
     * Use it only if a link doesn't have a meaningful href.
     *
     * Use Link component intead if href has a meaningful value for better accessibility.
     */
    href?: string;

    /**
     * Use with external links.
     *
     * Set target to 'true' if you want the link to open in a new tab.
     * @default false
     * @type {boolean}
     */
    target?: boolean;

    /**
     * Add custom styling to the button.
     * @default undefined
     * @type {{}}
     */
    sx?: SxProps;

    /**
     * Children is not a valid prop.
     * @type {never}
     */
    children?: never;
};

/**
 * A button component.
 * @param {...ButtonProps} props - The {@link ButtonProps}.
 * @returns {ReactElement} A new {@link Button} component.
 * @example
 * <Button label='Click me' variant='filled' isFullWidth startWithIcon={<AddCircle />} />
 */
export const Button = ({ variant, label, disabled, secondary, size, isFullWidth, startWithIcon, endWithIcon, target, type, onClick, href, sx }: ButtonProps): ReactElement =>
    <MuiButton
        variant={variant === 'filled' ? 'contained' : variant || 'text'}
        disabled={disabled}
        color={secondary ? 'secondary' : 'primary'}
        size={size || 'small'}
        fullWidth={variant === 'fullwidth' || isFullWidth}
        startIcon={variant === 'danger' ? <ErrorRounded /> : startWithIcon}
        endIcon={endWithIcon}
        type={type || 'button'}
        onClick={onClick}
        href={href}
        //@ts-ignore
        target={target ? '_blank' : undefined}
        sx={sx}
        disableElevation
    >
        {label}
    </MuiButton>;
