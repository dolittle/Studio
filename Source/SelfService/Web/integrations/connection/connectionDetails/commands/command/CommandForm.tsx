// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Form } from '@dolittle/design-system';

type NewCommandFormParameters = {
    commandName: string;
    namespace: string;
    description: string;
};

export type CommandFormProps = {
    children: React.ReactNode;
};

export const CommandForm = ({ children }: CommandFormProps) => {
    return (
        <Form<NewCommandFormParameters>
            initialValues={{
                commandName: '',
                namespace: '',
                description: '',
            }}
            onSubmit={() => { }}
        >
            {children}
        </Form>
    );
};
