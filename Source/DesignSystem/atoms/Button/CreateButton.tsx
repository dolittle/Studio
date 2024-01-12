// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button, ButtonProps } from '../../index';

/**
 * The props for a {@link CreateButton} component.
 */
export type CreateButtonProps = {
    /**
     * The text to display on the button.
     */
    label: string;

    /**
     * Add an icon to the start of the button.
     *
     * @default RocketLaunch
     */
    icon?: ButtonProps['startWithIcon'];

    /**
     * Whether the button is disabled.
     */
    isDisabled?: boolean;

    /**
     * The function to call when the button is clicked.
     */
    onCreate: () => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: ButtonProps['sx'];
};

/**
 * The create button is a button that is used for creating new items. Usually under DataGrids.
 * @param {CreateButtonProps} props - The {@link CreateButtonProps}.
 * @returns A {@link CreateButton} component.
 */
export const CreateButton = ({ label, icon, isDisabled, onCreate, sx }: CreateButtonProps) =>
    <Button
        label={label}
        variant='fullwidth'
        startWithIcon={icon ?? 'RocketLaunch'}
        disabled={isDisabled}
        onClick={onCreate}
        sx={{ mt: 2, ...sx }}
    />;
