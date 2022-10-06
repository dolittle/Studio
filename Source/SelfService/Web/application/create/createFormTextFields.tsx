// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

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
        }
    },
    formField: {
        'letterSpacing': '0.15px',
        [themeDark.breakpoints.down('sm')]: {
            mb: 2.5
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: 'error.light',
            letterSpacing: '0.4px'
        }
    },
};

export type CreateFormTextFieldsProps = {
    formError: FormErrorStates,
    setError: React.Dispatch<React.SetStateAction<FormErrorStates>>,
    newApplication: ShortInfo,
    onAppChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    contactName: string,
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    contactEmail: string,
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const CreateFormTextFields = (
    { formError, setError, newApplication, onAppChange, contactName, onNameChange, contactEmail, onEmailChange }: CreateFormTextFieldsProps) => {

    const errors = { ...formError };

    const { formFieldsWrapper, formField } = styles;

    return (
        <>
            <Box sx={formFieldsWrapper}>
                <FormControl sx={styles.input}>
                    <InputLabel
                        error={formError.applicationNameError.appError}
                        sx={{ top: '-0.5rem' }}
                        required
                        htmlFor='application-name'
                    >
                        Application Name
                    </InputLabel>
                    <OutlinedInput
                        id='application-name'
                        value={newApplication.name}
                        type='text'
                        error={formError.applicationNameError.appError}
                        onChange={onAppChange}
                        onBlur={() => validateAppName(errors, setError, newApplication.name)}
                        label='Application Name'
                        aria-describedby="application-name-helper-text"
                        size='small'
                        sx={styles.formField}
                    />
                    <FormHelperText sx={{ color: 'error.light' }} id="application-name-helper-text">{formError.applicationNameError.appErrorMessage}</FormHelperText>
                </FormControl>
            </Box>

            <Box mt={3.5} sx={formFieldsWrapper}>
                <FormControl sx={styles.input}>
                    <InputLabel
                        error={formError.contactNameError.nameError}
                        sx={{ top: '-0.5rem' }}
                        required
                        htmlFor='contact-name'
                    >
                        Contact Name
                    </InputLabel>
                    <OutlinedInput
                        id='contact-name'
                        value={contactName}
                        type='text'
                        error={formError.contactNameError.nameError}
                        onChange={onNameChange}
                        onBlur={() => validateContactName(errors, setError, contactName)}
                        label='Contact Name'
                        aria-describedby="contact-name-helper-text"
                        size='small'
                        sx={styles.formField}
                    />
                    <FormHelperText sx={{ color: 'error.light' }} id="contact-name-helper-text">{formError.contactNameError.nameErrorMessage}</FormHelperText>
                </FormControl>

                <FormControl sx={styles.input}>
                    <InputLabel
                        error={formError.contactEmailError.emailError}
                        sx={{ top: '-0.5rem' }}
                        required
                        htmlFor='contact-email'
                    >
                        Contact Email
                    </InputLabel>
                    <OutlinedInput
                        id='contact-email'
                        value={contactEmail}
                        type='text'
                        error={formError.contactEmailError.emailError}
                        onChange={onEmailChange}
                        onBlur={() => validateEmail(errors, setError, contactEmail)}
                        label='Contact Email'
                        aria-describedby="contact-email-helper-text"
                        size='small'
                        sx={styles.formField}
                    />
                    <FormHelperText sx={{ color: 'error.light' }} id="contact-email-helper-text">{formError.contactEmailError.emailErrorMessage}</FormHelperText>
                </FormControl>
            </Box>
        </>
    );
};
