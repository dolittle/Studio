// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ShortInfo } from '../api/api';

export type FormErrorStates = {
    applicationNameError: {
        appErrorMessage: string,
        appError: boolean,
    },
    contactNameError: {
        nameErrorMessage: string,
        nameError: boolean,
    },
    contactEmailError: {
        emailErrorMessage: string,
        emailError: boolean,
    }
};

const validateEmail = (error: FormErrorStates, email: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.trim() || !email.match(emailRegex)) {
        error.contactEmailError.emailErrorMessage = 'Please enter a valid email address.';
        error.contactEmailError.emailError = true;
    } else {
        error.contactEmailError.emailErrorMessage = '';
        error.contactEmailError.emailError = false;
    }
};

const validateContactName = (error: FormErrorStates, contactName: string) => {
    if (!contactName.trim()) {
        error.contactNameError.nameErrorMessage = 'Contact name required.';
        error.contactNameError.nameError = true;
    } else if (!/^[a-zA-Z0-9]+$/.test(contactName)) {
        error.contactNameError.nameErrorMessage = 'Name can only contain alphanumeric characters.';
        error.contactNameError.nameError = true;
    } else {
        error.contactNameError.nameErrorMessage = '';
        error.contactNameError.nameError = false;
    }
};

const validateAppName = (error: FormErrorStates, app: ShortInfo) => {
    if (!app.name.trim().length) {
        error.applicationNameError.appErrorMessage = 'Application name required.';
        error.applicationNameError.appError = true;
    } else if (!/^[a-zA-Z0-9]+$/.test(app.name)) {
        error.applicationNameError.appErrorMessage = 'Name can only contain alphanumeric characters.';
        error.applicationNameError.appError = true;
    } else {
        error.applicationNameError.appErrorMessage = '';
        error.applicationNameError.appError = false;
    }
};

export const validateTextFields = (
    formError: FormErrorStates,
    setFormError: React.Dispatch<React.SetStateAction<FormErrorStates>>,
    application: ShortInfo,
    contactName: string,
    contactEmail: string) => {

    const errors = { ...formError };

    validateAppName(errors, application);
    validateContactName(errors, contactName);
    validateEmail(errors, contactEmail);

    setFormError(errors);

    return (
        !errors.applicationNameError.appError &&
        !errors.contactNameError.nameError &&
        !errors.contactEmailError.emailError);
};
