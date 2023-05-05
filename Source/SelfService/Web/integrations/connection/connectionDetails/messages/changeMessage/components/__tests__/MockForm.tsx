// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Form } from '@dolittle/design-system';
import { NewMessageMappingParameters } from '../MessageMappingForm';

export type MockFormProps = {
    children: React.ReactNode;
};

export const MockForm = ({ children }: MockFormProps) =>
    <Form<NewMessageMappingParameters>
        initialValues={{
            name: '',
            description: '',
            fields: [],
        }}
        onSubmit={() => { }}
    >
        {children}
    </Form>;

