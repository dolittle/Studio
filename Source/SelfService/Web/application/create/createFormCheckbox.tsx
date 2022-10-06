// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { themeDark } from '@dolittle/design-system';

import { EnvironmentsProps } from './create';

const styles = {
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        [themeDark.breakpoints.down('sm')]: {
            flexDirection: 'column',
            m: 0,
        }
    },
    formGroup: {
        display: 'inline-flex'
    },
    label: {
        mr: 0
    }
};

export type CreateFormCheckboxProps = {
    environments: EnvironmentsProps,
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>, environmentIndex: number) => void
};

export const CreateFormCheckbox = ({ environments, handleOnChange }: CreateFormCheckboxProps) => (
    <Box sx={{ ...styles.formFieldsWrapper, mb: 7.5 }}>
        {environments.map((environment, environmentIndex) => (
            <FormGroup key={environmentIndex} sx={styles.formGroup}>
                <FormControlLabel
                    sx={styles.label}
                    control={
                        <Checkbox
                            checked={environment.checked}
                            disabled={environment.disabled}
                            onChange={(event) => handleOnChange(event, environmentIndex)}
                            name={environment.shortName}
                        />
                    }
                    label={environment.name}
                />
            </FormGroup>
        ))}
    </Box>
);

