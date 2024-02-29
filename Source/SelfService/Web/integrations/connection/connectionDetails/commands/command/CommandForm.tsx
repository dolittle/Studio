// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { CreateCommand } from '../../../../../apis/integrations/generated';
import { useConnectionsIdCommandsCommandIdCreatePostRequest } from '../../../../../apis/integrations/commandMappingApi.hooks';

import { Form } from '@dolittle/design-system';

function generateUUID() {
    let d = new Date().getTime();
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

type NewCommandFormParameters = CreateCommand & {
    id?: string;
    commandId?: string;
};

export type CommandFormProps = {
    connectionId: string;
    selectedProgramName: string;
    selectedTransactionName: string;
    children: React.ReactNode;
};

export const CommandForm = ({ connectionId, selectedProgramName, selectedTransactionName, children }: CommandFormProps) => {
    const navigate = useNavigate();
    const saveCommandMutation = useConnectionsIdCommandsCommandIdCreatePostRequest();

    const handleNewCommandSave = (values: NewCommandFormParameters) => {
        // saveCommandMutation.mutate({
        //     id: connectionId,
        //     commandId: generateUUID(),
        //     createCommand: {
        //         commandName: values.commandName,
        //         commandDescription: values.commandDescription,
        //         namespace: values.namespace,
        //         m3Program: 'AAS350MI', //SelectedProgramName
        //         m3Transaction: 'LstVoucherHeads',//SelectedTransactionName
        //     },
        // }, {
        //     onSuccess() {
        //         navigate(`..`);
        //         enqueueSnackbar(`Command '${values.commandName}' successfully created.`);
        //     },
        //     onError() {
        //         enqueueSnackbar('Something went wrong when trying to save the command.', { variant: 'error' });
        //     },
        // });
        // console.log(values, 'values');
        // console.log(selectedProgramName, 'selectedProgramName');
        // console.log(selectedTransactionName, 'selectedTransactionName');

        navigate('..');
        enqueueSnackbar('Command successfully created.');
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
