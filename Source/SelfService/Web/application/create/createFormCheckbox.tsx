// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { EnvironmentsProps } from './create';

import { themeDark } from '../../theme/theme';
import { Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const styles = {
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        [themeDark.breakpoints.down('sm')]: {
            flexDirection: 'column',
            margin: '0',
        }
    },
    formGroup: {
        display: 'inline-flex'
    },
    label: {
        marginInlineEnd: '0'
    }
};

// TODO: add types
export const CreateFormCheckbox = ({ environments, onChange }:
    { environments: EnvironmentsProps, onChange: any }) => {

    const { formFieldsWrapper, formGroup, label } = styles;

    return (
        <Box mb={7.5} sx={formFieldsWrapper}>
            {environments.map((environment, environmentIndex) => (
                <FormGroup key={environmentIndex} sx={formGroup}>
                    <FormControlLabel
                        sx={label}
                        control={
                            <Checkbox
                                checked={environment.checked}
                                disabled={environment.disabled}
                                onChange={(event) => onChange(event, environmentIndex)}
                                name={environment.shortName}
                            />
                        }
                        label={environment.name}
                    />
                </FormGroup>
            ))}
        </Box>
    );
};
