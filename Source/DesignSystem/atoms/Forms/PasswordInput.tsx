// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { forwardRef } from 'react';

import { IconButton } from '@dolittle/design-system';

import type { Form } from './Form';
import { Input, InputProps } from './Input';

/**
 * The props for a {@link PasswordInput} component.
 */
export type PasswordInputProps = InputProps & {
};


/**
 * Creates a password input field to be used in a {@link Form}.
 * By default, the input will be masked with an option to show the password.
 * @param props - The {@link PasswordInputProps} for the input.
 * @returns A {@link PasswordInput} component.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ ...inputProps }: PasswordInputProps, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <Input
            type={showPassword ? 'text' : 'password'}
            startAdornment={
                <IconButton
                    icon={showPassword ? 'VisibilityOff' : 'Visibility'}
                    tooltipText={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword(!showPassword)}
                />
            }
            {...inputProps}
        />
    );
});

PasswordInput.displayName = 'PasswordInput';
