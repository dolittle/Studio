// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { Input } from '@dolittle/design-system';
import { alphaNumericLowerCasedCharsRegex, emailRegex } from '../../../utils/validation/patterns';

const styles = {
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: {
            xs: 'column',
            sm: 'row'
        },
        mt: {
            sm: 3.5
        }
    }
};


type InputFieldsProps = {
    nameId: string;
    contactId: string;
    emailId: string;
};

export const InputFields = ({ nameId, contactId, emailId }: InputFieldsProps) =>
    <>
        <Input
            id={nameId}
            label='Application Name'
            required='Application name required.'
            pattern={{
                value: alphaNumericLowerCasedCharsRegex,
                message: 'Name can only contain lowercase alphanumeric characters.'
            }}
            sx={{ display: 'flex' }}
        />

        <Box sx={styles.formFieldsWrapper}>
            <Input
                id={contactId}
                label='Contact Name'
                required='Contact name required.'
            />
            <Input
                id={emailId}
                label='Contact Email'
                required='Contact email address required.'
                pattern={{
                    value: emailRegex,
                    message: 'Please enter a valid email address.'
                }}
            />
        </Box>
    </>;
