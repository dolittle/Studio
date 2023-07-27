// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useController as reactHookFormUseController, ControllerRenderProps, UseControllerProps, FieldError, Message, ValidationRule } from 'react-hook-form';

type ControllerRules = NonNullable<UseControllerProps<any>['rules']>;
type ValidationProps = Omit<ControllerRules, 'deps' | 'shouldUnregister' | 'value' | 'disabled'>;

type InputProps = {
    /**
     * The id of the field.
     */
    id: string;

    /**
     * The human readable label for the field.
     *
     * This is used to generate default error messages so please use capitalization as necessary.
     */
    label: string;

    /**
     * An optional boolean to indicate whether or not the field should be editable.
     */
    disabled?: boolean;
};

/**
 * Defines the properties of a form input-field component.
 */
export type FieldProps = InputProps & ValidationProps;

/**
 * Splits {@link FieldProps} into props for a MUI Component and a react-hook-form Controller.
 * @param props The input-field component props.
 * @returns [{@link InputProps}, {@link ValidationProps}]
 */
export const useFieldProps = (props: FieldProps): [InputProps, ValidationProps] => {
    const { id, label, disabled, ...validation } = props;
    return [{ id, label, disabled }, validation];
};

/**
 * Checks whether or not there is an error for an input-field, and generates default error messages using the label if none is set explicitly.
 * @param label The human readable name of the input field - used to generate default error messages.
 * @param error The optional error for the input field.
 * @returns An array with a boolean that is true if there is an error, and an optional error message describing the error.
 */
export const useFieldError = (label: string, error?: FieldError): [boolean, string?] => {
    if (error === undefined) {
        return [false];
    }

    if (typeof error.message === 'string' && error.message !== '') {
        return [true, error.message];
    }

    if (error.type === 'required') {
        return [true, `${label} required.`];
    }

    if (error.type === 'pattern') {
        return [true, `Please enter a valid ${label}.`];
    }

    return [true];
};

/**
 * A wrapper of the `react-hook-form` `useController` that returns the render-props and error states for the given input-field.
 * @param props The {@link FieldProps} of the input-field.
 * @returns An object with the render-props for a controlled component, and the error state of the input-field.
 */
export const useController = (props: FieldProps): { field: ControllerRenderProps, hasError: boolean, errorMessage?: string } => {
    const [inputProps, rules] = useFieldProps(props);
    const { field, fieldState } = reactHookFormUseController({ name: inputProps.id, rules });
    const [hasError, errorMessage] = useFieldError(inputProps.label, fieldState.error);

    if (field.value === undefined) {
        field.value = '';
    }

    return { field, hasError, errorMessage };
};

export const isRequired = (required?: Message | ValidationRule<boolean>): boolean => {
    if (required === undefined) {
        return false;
    }

    if (typeof required === 'boolean') {
        return required;
    }

    if (typeof required === 'string') {
        return true;
    }

    if (typeof required === 'object' && typeof required.value === 'boolean') {
        return required.value;
    }

    return required.value;
};
