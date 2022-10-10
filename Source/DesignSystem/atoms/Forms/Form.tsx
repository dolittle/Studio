// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactNode } from 'react';
import { useForm, FieldValues, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { Box } from '@mui/material';

/**
 * The props for a {@link Form} component.
 */
export type FormProps<T extends FieldValues> = {
    /**
     * The initial (default) values of the input form.
     */
    initialValues: T;

    /**
     * An optional callback to call when the form is submitted with valid data.
     */
    onSubmit?: SubmitHandler<T>;

    /**
     * An optional callback to call when the form is submitted with invalid data.
     */
    onSubmitInvalid?: SubmitErrorHandler<T>;

    children?: ReactNode;
};

/**
 * Creates a form that deals with input-validation using `react-hook-form`.
 * @param props The {@link FormProps} for the form.
 * @returns A new {@link Form} component.
 */
export const Form = <T extends FieldValues>(props: FormProps<T>) => {
    const methods = useForm<T>({
        mode: 'onBlur',
        defaultValues: props.initialValues as any,
    });
    const { handleSubmit } = methods;

    return (
        <Box component='form' onSubmit={handleSubmit((data, event) => props.onSubmit?.(data, event), props.onSubmitInvalid)}>
            <FormProvider {...methods}>
                {props.children}
            </FormProvider>
        </Box>
    );
};
