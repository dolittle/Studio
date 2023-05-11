// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useFormState } from 'react-hook-form';
import { Button } from '@dolittle/design-system';


export const GenerateCredentialsFormSubmitButton = () => {
    const { isValid } = useFormState();
    return <Button
        label='Generate Token'
        type='submit'
        variant='outlined'
        disabled={!isValid} />;
};
