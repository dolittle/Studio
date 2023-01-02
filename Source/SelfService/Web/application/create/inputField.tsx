// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { Input } from '@dolittle/design-system';

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

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const alphaCharsRegex = /[a-z0-9]$/i;

export const InputFields = ({ nameId, contactId, emailId }) =>
    <>
        <Input
            id={nameId}
            label='Application Name'
            required='Application name required.'
            pattern={{
                value: alphaCharsRegex,
                message: 'Name can only contain alphanumeric characters.'
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
