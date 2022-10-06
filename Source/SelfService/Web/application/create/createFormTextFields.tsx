// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { Dispatch, ChangeEvent, SetStateAction } from 'react';

import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { themeDark } from '@dolittle/design-system';

import { FormErrorStates, validateAppName, validateContactName, validateEmail } from '../../utils/formTextFieldsValidation';
import { ShortInfo } from '../../api/api';

const styles = {
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        [themeDark.breakpoints.down('sm')]: {
            flexDirection: 'column',
            m: 0
        }
    },
    input: {
        'maxWidth': 220,
        '.MuiInputLabel-root[data-shrink="true"]': {
            top: 0
        },
        '.MuiFormHelperText-root.Mui-error': {
            color: 'error.light',
            letterSpacing: '0.4px'
        }
    },
    formField: {
        letterSpacing: '0.15px',
        [themeDark.breakpoints.down('sm')]: {
            mb: 2.5
        }
    },
};

export type CreateFormTextFieldsProps = {
    formError: FormErrorStates,
    setError: Dispatch<SetStateAction<FormErrorStates>>,
    newApplication: ShortInfo,
    onAppChange: (event: ChangeEvent<HTMLInputElement>) => void,
    contactName: string,
    onNameChange: (event: ChangeEvent<HTMLInputElement>) => void,
    contactEmail: string,
    onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

export const CreateFormTextFields = (
    { formError, setError, newApplication, onAppChange, contactName, onNameChange, contactEmail, onEmailChange }: CreateFormTextFieldsProps) => {

    const errors = { ...formError };

    const {
        applicationNameError: { appErrorMessage, appError },
        contactNameError: { nameErrorMessage, nameError },
        contactEmailError: { emailErrorMessage, emailError }
    } = formError;

    return (
        <>
            <FormControl sx={{ ...styles.formFieldsWrapper, ...styles.input }}>
                <InputLabel
                    error={appError}
                    sx={{ top: -8 }}
                    required
                    htmlFor='application-name'
                >
                    Application Name
                </InputLabel>

                <OutlinedInput
                    id='application-name'
                    value={newApplication.name}
                    type='text'
                    error={appError}
                    onChange={onAppChange}
                    onBlur={() => validateAppName(errors, setError, newApplication.name)}
                    label='Application Name'
                    aria-describedby="application-name-helper-text"
                    size='small'
                    sx={styles.formField}
                />

                <FormHelperText error={appError} id="application-name-helper-text">
                    {appErrorMessage}
                </FormHelperText>
            </FormControl>

            <Box sx={{ mt: 3.5, ...styles.formFieldsWrapper }}>
                <FormControl sx={styles.input}>
                    <InputLabel
                        error={nameError}
                        sx={{ top: -8 }}
                        required
                        htmlFor='contact-name'
                    >
                        Contact Name
                    </InputLabel>

                    <OutlinedInput
                        id='contact-name'
                        value={contactName}
                        type='text'
                        error={nameError}
                        onChange={onNameChange}
                        onBlur={() => validateContactName(errors, setError, contactName)}
                        label='Contact Name'
                        aria-describedby="contact-name-helper-text"
                        size='small'
                        sx={styles.formField}
                    />

                    <FormHelperText error={nameError} id="contact-name-helper-text">
                        {nameErrorMessage}
                    </FormHelperText>
                </FormControl>

                <FormControl sx={styles.input}>
                    <InputLabel
                        error={emailError}
                        sx={{ top: -8 }}
                        required
                        htmlFor='contact-email'
                    >
                        Contact Email
                    </InputLabel>

                    <OutlinedInput
                        id='contact-email'
                        value={contactEmail}
                        type='text'
                        error={emailError}
                        onChange={onEmailChange}
                        onBlur={() => validateEmail(errors, setError, contactEmail)}
                        label='Contact Email'
                        aria-describedby="contact-email-helper-text"
                        size='small'
                        sx={styles.formField}
                    />

                    <FormHelperText error={emailError} id="contact-email-helper-text">
                        {emailErrorMessage}
                    </FormHelperText>
                </FormControl>
            </Box>
        </>
    );
};
