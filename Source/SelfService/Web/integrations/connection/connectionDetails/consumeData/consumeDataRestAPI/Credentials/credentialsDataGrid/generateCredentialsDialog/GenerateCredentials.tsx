// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Input, Select } from '@dolittle/design-system';

import { ServiceAccountAccess } from '../../../../../../../../apis/integrations/generated';

const accessOptions = [
    { displayValue: 'Read', value: ServiceAccountAccess.Read },
    { displayValue: 'Read & Write', value: ServiceAccountAccess.ReadWrite },
    { displayValue: 'Admin', value: ServiceAccountAccess.Admin },
];

export const GenerateCredentials = () =>
    <>
        <Input id='name' label='Name' required />
        <Input id='description' label='Description' />
        <Select id='access' label='Access' options={accessOptions} />
    </>;
