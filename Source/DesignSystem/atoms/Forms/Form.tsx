// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, ReactNode, useImperativeHandle, ForwardedRef } from 'react';
import { useForm, FieldValues, FormProvider, SubmitHandler, SubmitErrorHandler, UseFormReturn } from 'react-hook-form';

import { Box, SxProps } from '@mui/material';

export type FormRef<T extends FieldValues> = UseFormReturn<T, any>;

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

    /**
     * Optional ref that contains the {@link UseFormReturn<T>} object returned from {@link useForm}.
     * Practical for accessing the form's state from the parent component, and doing things like resetting the form.
     * More info on approach here: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/#option-1---wrapper-component
     */
    fRef?: ForwardedRef<FormRef<T>>;
};

/**
 * Creates a form that deals with input-validation using `react-hook-form`.
 * @param {FormProps} props The {@link FormProps} for the form.
 * @returns A {@link Form} component.
 */
export const Form = <T extends FieldValues>({ initialValues, onSubmit, onSubmitInvalid, children, sx, fRef }: FormProps<T>) => {
    const methods = useForm<T>({
        mode: 'onTouched',
        defaultValues: initialValues as any,
    });
    const { handleSubmit } = methods;

    useImperativeHandle(fRef, () => methods, [methods]);

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
