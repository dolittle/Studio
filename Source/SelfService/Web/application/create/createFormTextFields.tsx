// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, TextField } from '@mui/material';
import { themeDark } from '@dolittle/design-system';

import { FormErrorStates } from '../../utils/formTextFieldsValidation';
import { ShortInfo } from '../../api/api';

const styles = {
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        [themeDark.breakpoints.down('sm')]: {
            flexDirection: 'column',
            m: 0,
        }
    },
    formField: {
        'letterSpacing': '0.15px',
        [themeDark.breakpoints.down('sm')]: {
            mb: 2.5
        },
        '& .MuiInputLabel-root.Mui-error': {
            'color': 'error.dark',
            '& .MuiFormLabel-asterisk.Mui-error': {
                color: 'error.dark',
            },
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            color: 'error.dark',
            borderColor: 'error.dark'
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: 'error.light',
            letterSpacing: '0.4px'
        }
    },
};

export type CreateFormTextFieldsProps = {
    formError: FormErrorStates,
    newApplication: ShortInfo,
    onAppChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    contactName: string,
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    contactEmail: string,
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const CreateFormTextFields = (
    { formError, newApplication, onAppChange, contactName, onNameChange, contactEmail, onEmailChange }: CreateFormTextFieldsProps) => {

    const {
        applicationNameError: { appError, appErrorMessage },
        contactNameError: { nameError, nameErrorMessage },
        contactEmailError: { emailError, emailErrorMessage }
    } = formError;

    const { formFieldsWrapper, formField } = styles;
    return (
        <>
            <Box sx={formFieldsWrapper}>
                <TextField
                    required
                    error={appError}
                    helperText={appErrorMessage}
                    id='applicationName'
                    label='Application Name'
                    value={newApplication.name}
                    size='small'
                    onChange={onAppChange}
                    sx={formField}
                />
            </Box>

            <Box mt={3.5} sx={formFieldsWrapper}>
                <TextField
                    required
                    error={nameError}
                    helperText={nameErrorMessage}
                    id='contactName'
                    label='Contact Name'
                    value={contactName}
                    size='small'
                    onChange={onNameChange}
                    sx={formField}
                />

                <TextField
                    required
                    error={emailError}
                    helperText={emailErrorMessage}
                    id='contactEmail'
                    label='Contact Email'
                    value={contactEmail}
                    type='email'
                    size='small'
                    onChange={onEmailChange}
                    sx={formField}
                />
            </Box>
        </>
    );
};
