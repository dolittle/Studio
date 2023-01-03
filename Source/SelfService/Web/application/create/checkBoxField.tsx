// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { Checkbox } from '@dolittle/design-system';

const styles = {
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: {
            xs: 'column',
            sm: 'row'
        },
        mb: 7.5,
        mt: 4.5
    }
};

type CheckBoxesFieldProps = {
    prodId: string;
    devId: string;
    testId: string;
};

export const CheckBoxesField = ({ prodId, devId, testId }: CheckBoxesFieldProps) =>
    <Box sx={styles.formFieldsWrapper}>
        <Checkbox
            id={prodId}
            label='Production *'
            disabled
        />
        <Checkbox
            id={devId}
            label='Development'
        />
        <Checkbox
            id={testId}
            label='Test'
        />
    </Box>;
