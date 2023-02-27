// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, ReactNode } from 'react';
import { useForm, FieldValues, FormProvider, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import { Box, SxProps } from '@mui/material';

/**
 * The props for a {@link Form} component.
 */
export type FormProps<T extends FieldValues> = {
    /**
     * The initial (default) values of the input form.
     */
    initialValues: T;

    /**
     * The children of the form.
     */
    children: ReactNode;

    /**
     * Callback to call when the form is submitted with valid data.
     */
    onSubmit?: SubmitHandler<T>;

    /**
     * Callback to call when the form is submitted with invalid data.
     */
    onSubmitInvalid?: SubmitErrorHandler<T>;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * Creates a form that deals with input-validation using `react-hook-form`.
 * @param {FormProps} props The {@link FormProps} for the form.
 * @returns A {@link Form} component.
 */
export const Form = <T extends FieldValues>({ initialValues, onSubmit, onSubmitInvalid, children, sx }: FormProps<T>) => {
    const methods = useForm<T>({
        mode: 'onTouched',
        defaultValues: initialValues as any,
    });
    const { handleSubmit } = methods;

    const handleFormSubmit = useMemo(() => handleSubmit(
        (data, event) => onSubmit?.(data, event),
        onSubmitInvalid,
    ), [handleSubmit, onSubmit, onSubmitInvalid]);

    return (
        <Box component='form' onSubmit={handleFormSubmit} autoComplete='off' sx={sx}>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </Box>
    );
};
