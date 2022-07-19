// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormErrorStates } from '../../utils/formTextFieldsValidation';
import { ShortInfo } from '../../api/api';

import { themeDark } from '../../theme/theme';
import { Box, TextField } from '@mui/material';

const { dark, light } = themeDark.palette.error;
const styles = {
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        [themeDark.breakpoints.down('sm')]: {
            flexDirection: 'column',
            margin: '0',
        }
    },
    formField: {
        'letterSpacing': '0.15px',
        [themeDark.breakpoints.down('sm')]: {
            marginBlockEnd: '20px'
        },
        '& .MuiInputLabel-root.Mui-error': {
            'color': dark,
            '& .MuiFormLabel-asterisk.Mui-error': {
                color: dark,
            },
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            color: dark,
            borderColor: dark
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: light,
            letterSpacing: '0.4px'
        }
    },
};

export type CreateFormTextFieldsProps = {
    formError: FormErrorStates,
    app: ShortInfo,
    onAppChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    contactName: string,
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    contactEmail: string,
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

// TODO: add types
export const CreateFormTextFields: React.FC<CreateFormTextFieldsProps> = (
    { formError, app, onAppChange, contactName, onNameChange, contactEmail, onEmailChange }: CreateFormTextFieldsProps) => {

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
                    value={app.name}
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
