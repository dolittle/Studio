// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFormState } from 'react-hook-form';

import { Box } from '@mui/material';

import { Button } from '@dolittle/design-system';

export type GenerateCredentialsFormSubmitButtonProps = {
    canCancel: boolean;
    onFormCancelled(): void;
};

export const GenerateCredentialsFormSubmitButton = ({ canCancel, onFormCancelled }: GenerateCredentialsFormSubmitButtonProps) => {
    const { isValid } = useFormState();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {canCancel && <Button label='Cancel' sx={{ mr: 6 }} onClick={onFormCancelled} />}
            <Button label='Generate Token' type='submit' variant='outlined' disabled={!isValid} />
        </Box>
    );
};
