// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { AlertBox, Button, ContentContainer, ContentDivider, ContentHeader, Form, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdCommandsCommandIdGet, useConnectionsIdCommandsCommandIdParametersPostRequest } from '../../../../../apis/integrations/commandMappingApi.hooks';
import { CommandMappingModel, UpdateCommandParameters } from '../../../../../apis/integrations/generated';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CommandCancelButton } from './CommandCancelButton';
import { NewCommandView } from './newCommand';
import { CommandDetailSection } from './CommandDetailSection';
import { EditCommandSection } from './editCommand/editCommandSection/EditCommandSection';

export type ViewMode = 'new' | 'edit';

export const CommandView = () => {
    const connectionId = useConnectionIdFromRoute();
    const { commandId = '' } = useParams();

    const [commandRows, setCommandRows] = useState<UpdateCommandParameters[]>([]);

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';

    if (mode === 'edit' && (!commandId)) return <AlertBox />;

    const { data, isError, isLoading } = useConnectionsIdCommandsCommandIdGet({ id: connectionId, commandId });

    if (mode === 'edit' && isError) return <AlertBox />;
    if (mode === 'edit' && isLoading) return <LoadingSpinner />;

    // TODO: set initial command data and change it from the 'updateRow' function in the EditCommandSection.
    const initialCommandData: EditCommandFormParameters = {
        parameters: data?.parameters?.map(parameter => ({
            mappedName: parameter.mappedName,
            mappedDescription: parameter.mappedDescription,
            parameter: parameter.parameter,
            defaultValue: parameter.defaultValue,
            mode: parameter.mode,
        })) || [],
    };

    const title = mode === 'new' ? 'Create New Command' : `Edit Command - ${data?.name || 'N/A'}`;

    return (
        <ContentContainer>
            <ContentHeader title={title} buttonsSlot={<CommandCancelButton />} sx={{ pb: 0 }} />

            {mode === 'new'
                ? <NewCommandView connectionId={connectionId} />
                : <EditCommandForm connectionId={connectionId} commandId={commandId} commandData={data}>
                    <CommandDetailSection isDisabled={mode === 'edit'} />

                    <EditCommandSection commandData={data} />

                    <SubmitButtonSection />
                </EditCommandForm>
            }
        </ContentContainer>
    );
};

// TODO: Move these to a separate file.
export const SubmitButtonSection = () =>
    <>
        <ContentDivider sx={{ mt: 3, mb: 2 }} />
        <Button label='Save Changes' type='submit' startWithIcon='AddCircle' variant='fullwidth' />
    </>;

export type EditCommandFormParameters = UpdateCommandParameters & {
    id?: string;
    commandId?: string;
    commandName?: string;
    description?: string;
    namespace?: string;
};

export type EditCommandFormProps = {
    connectionId: string;
    commandId: string;
    commandData: CommandMappingModel | undefined;
    children: React.ReactNode;
};

export const EditCommandForm = ({ connectionId, commandId, commandData, children }: EditCommandFormProps) => {
    const navigate = useNavigate();

    const saveCommandMappingMutation = useConnectionsIdCommandsCommandIdParametersPostRequest();

    const handleEditCommandSave = (values: EditCommandFormParameters) => {
        console.log(values, 'datagrid');

        // saveCommandMappingMutation.mutate({
        //     id: connectionId,
        //     commandId,
        //     updateCommandParameters: {
        //         parameters: [{
        //             mappedName: values.mappedName,
        //             mappedDescription: values.mappedDescription,
        //             defaultValue: values.defaultValue,
        //             mode: values.mode,
        //         }],
        //     },
        // }, {
        //     onSuccess() {
        //         navigate(`..`);
        //         enqueueSnackbar('Command successfully updated.');
        //     },
        //     onError() {
        //         enqueueSnackbar('Something went wrong when trying to save the command.', { variant: 'error' });
        //     },
        // });
    };

    // TODO: Separate parameters and command details into different forms.
    return (
        <Form<EditCommandFormParameters>
            initialValues={{
                commandName: commandData?.name,
                description: commandData?.description,
                namespace: commandData?.namespace,
                parameters: commandData?.parameters?.map(parameter => ({
                    mappedName: parameter.mappedName,
                    mappedDescription: parameter.mappedDescription,
                    parameter: parameter.parameter,
                    defaultValue: parameter.defaultValue,
                    mode: parameter.mode,
                })) || [],
            }}
            onSubmit={handleEditCommandSave}
        >
            {children}
        </Form>
    );
};
