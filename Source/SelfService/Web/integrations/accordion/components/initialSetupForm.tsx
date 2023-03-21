// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

import { Form, Input, Select } from '@dolittle/design-system';

const selectValues = [
    { value: 'On Premise', displayValue: 'On Premise' },
    { value: 'In the Dolittle Cloud', displayValue: 'In the Dolittle Cloud' }
];

type InitialSetupParameters = {
    connectorName: string;
    selectHosting: string;
};

export const InitialSetupForm = () =>
    <Form<InitialSetupParameters>
        initialValues={{
            connectorName: '',
            selectHosting: 'On Premise',
        }}
        onSubmit={() => { }}
        sx={{ mt: 6.5 }}
    >
        <Stack spacing={3.5}>
            <Input id='connectorName' label='Connector Name' required />
            <Select id='selectHosting' label='Hosting' options={selectValues} required disabled />
        </Stack>
    </Form>;
