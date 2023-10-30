// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

import { Input, Select } from '@dolittle/design-system';

import { ServiceAccountAccess } from '../../../../../../../apis/integrations/generated';

const accessOptions = [
    { displayValue: 'Read', value: ServiceAccountAccess.Read },
    { displayValue: 'Read & Write', value: ServiceAccountAccess.ReadWrite },
    { displayValue: 'Admin', value: ServiceAccountAccess.Admin },
];

export type GenerateCredentialsProps = {
    hasResult: boolean;
};

export const GenerateCredentials = ({ hasResult }: GenerateCredentialsProps) =>
    <Stack sx={{ mt: 3, gap: 2 }}>
        <Input id='name' label='Name' required disabled={hasResult} />
        <Input id='description' label='Description' disabled={hasResult} />
        <Select id='access' label='Access' options={accessOptions} />
    </Stack>;
