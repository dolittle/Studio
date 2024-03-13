// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { CreateCommand } from '../../../../../../apis/integrations/generated';
import { useConnectionsIdCommandsCommandIdCreatePostRequest } from '../../../../../../apis/integrations/commandMappingApi.hooks';

import { Form } from '@dolittle/design-system';

import { generateUUID } from '../../../../../../utils/generateUUID';

type NewCommandFormParameters = CreateCommand & {
    id?: string;
    commandId?: string;
};

export type NewCommandFormProps = {
    connectionId: string;
    selectedProgramName: string;
    selectedTransactionName: string;
    children: React.ReactNode;
};

export const NewCommandForm = ({ connectionId, selectedProgramName, selectedTransactionName, children }: NewCommandFormProps) => {
    const navigate = useNavigate();
    const saveCommandMutation = useConnectionsIdCommandsCommandIdCreatePostRequest();

    const handleNewCommandSave = (values: NewCommandFormParameters) => {
        saveCommandMutation.mutate({
            id: connectionId,
            commandId: generateUUID(),
            createCommand: {
                commandName: values.commandName,
                commandDescription: values.commandDescription,
                namespace: values.namespace,
                m3Program: selectedProgramName,
                m3Transaction: selectedTransactionName,
            },
        }, {
            onSuccess() {
                navigate(`..`);
                enqueueSnackbar(`Command '${values.commandName}' successfully created.`);
            },
            onError() {
                enqueueSnackbar('Something went wrong when trying to save the command.', { variant: 'error' });
            },
        });
    };

    return (
        <Form<NewCommandFormParameters>
            initialValues={{
                commandName: '',
                commandDescription: '',
                namespace: '',
            }}
            onSubmit={handleNewCommandSave}
        >
            {children}
        </Form>
    );
};
