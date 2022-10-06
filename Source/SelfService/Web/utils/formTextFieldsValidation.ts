// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

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

const alphaChars = /^[a-z0-9]+$/i;

export const validateEmail = (error: FormErrorStates, setEmailError: React.Dispatch<React.SetStateAction<FormErrorStates>>, email: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.trim()) {
        error.contactEmailError.emailErrorMessage = 'Contact email address required.';
        error.contactEmailError.emailError = true;
    } else if (!email.match(emailRegex)) {
        error.contactEmailError.emailErrorMessage = 'Please enter a valid email address.';
        error.contactEmailError.emailError = true;
    } else {
        error.contactEmailError.emailErrorMessage = '';
        error.contactEmailError.emailError = false;
    }

    setEmailError(error);
};

export const validateContactName = (error: FormErrorStates, setContactNameError: React.Dispatch<React.SetStateAction<FormErrorStates>>, contactName: string) => {
    if (!contactName.trim()) {
        error.contactNameError.nameErrorMessage = 'Contact name required.';
        error.contactNameError.nameError = true;
    } else if (!alphaChars.test(contactName)) {
        error.contactNameError.nameErrorMessage = 'Name can only contain alphanumeric characters.';
        error.contactNameError.nameError = true;
    } else {
        error.contactNameError.nameErrorMessage = '';
        error.contactNameError.nameError = false;
    }

    setContactNameError(error);
};

export const validateAppName = (error: FormErrorStates, setAppNameError: React.Dispatch<React.SetStateAction<FormErrorStates>>, applicationName: string) => {
    if (!applicationName.trim()) {
        error.applicationNameError.appErrorMessage = 'Application name required.';
        error.applicationNameError.appError = true;
    } else if (!alphaChars.test(applicationName)) {
        error.applicationNameError.appErrorMessage = 'Name can only contain alphanumeric characters.';
        error.applicationNameError.appError = true;
    } else {
        error.applicationNameError.appErrorMessage = '';
        error.applicationNameError.appError = false;
    }

    setAppNameError(error);
};

export const validateTextFields = (error: FormErrorStates, setError: React.Dispatch<React.SetStateAction<FormErrorStates>>, appName: string, contactName: string, contactEmail: string) => {
    const errors = { ...error };

    validateAppName(errors, setError, appName);
    validateContactName(errors, setError, contactName);
    validateEmail(errors, setError, contactEmail);

    return (
        !error.applicationNameError.appError &&
        !error.contactNameError.nameError &&
        !error.contactEmailError.emailError);
};
