// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

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
    const navigate = useNavigate();

    const handleNewCommandSave = (values: any) => {
        // saveMessageMappingMutation.mutate({
        //     id: connectionId,
        //     message: values.name,
        //     table: selectedTableName,
        //     setMessageMappingRequestArguments: {
        //         description: values.description,
        //         fields: values.fields,
        //         jqFilter: values.jqFilter,
        //     },
        // }, {
        //     onSuccess() {
        //         navigate(`..`);
        //         enqueueSnackbar('Message successfully created.');
        //     },
        //     onError() {
        //         enqueueSnackbar('Something went wrong when trying to save the message.', { variant: 'error' });
        //     },
        // });

        navigate('..');
        enqueueSnackbar('Command successfully created.');
    };

    return (
        <Form<NewCommandFormParameters>
            initialValues={{
                commandName: '',
                namespace: '',
                description: '',
            }}
            onSubmit={handleNewCommandSave}
        >
            {children}
        </Form>
    );
};
