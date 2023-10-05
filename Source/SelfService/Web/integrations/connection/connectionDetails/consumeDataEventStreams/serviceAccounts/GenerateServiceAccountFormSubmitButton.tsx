// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFormState } from 'react-hook-form';

import { Button } from '@dolittle/design-system';

export type GenerateServiceAccountFormSubmitButtonProps = {
    disabled: boolean;
};

export const GenerateServiceAccountFormSubmitButton = ({ disabled }: GenerateServiceAccountFormSubmitButtonProps) => {
    const { isValid, isSubmitting } = useFormState();

    return (
        <Button
            label='Generate Service Account'
            type='submit'
            variant='outlined'
            disabled={disabled || !isValid || isSubmitting}
        />
    );
};
