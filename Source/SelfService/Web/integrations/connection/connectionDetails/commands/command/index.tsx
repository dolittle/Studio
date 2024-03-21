// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useParams } from 'react-router-dom';

import { AlertBox, Button, ContentContainer, ContentDivider, ContentHeader, Form, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdCommandsCommandIdGet } from '../../../../../apis/integrations/commandMappingApi.hooks';
import { CommandMappingModel } from '../../../../../apis/integrations/generated';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CommandCancelButton } from './CommandCancelButton';
import { NewCommandView } from './newCommand';
import { CommandDetailSection } from './CommandDetailSection';
import { EditCommandSection } from './editCommand/editCommandSection/EditCommandSection';

export type ViewMode = 'new' | 'edit';

export const CommandView = () => {
    const connectionId = useConnectionIdFromRoute();
    const { commandId = '' } = useParams();

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';

    if (mode === 'edit' && (!commandId)) return <AlertBox />;

    const { data, isError, isLoading } = useConnectionsIdCommandsCommandIdGet({ id: connectionId, commandId });

    if (mode === 'edit' && isError) return <AlertBox />;
    if (mode === 'edit' && isLoading) return <LoadingSpinner />;

    const title = mode === 'new' ? 'Create New Command' : `Edit Command - ${data?.name || 'N/A'}`;

    return (
        <ContentContainer>
            <ContentHeader title={title} buttonsSlot={<CommandCancelButton />} sx={{ pb: 0 }} />

            {mode === 'new'
                ? <NewCommandView connectionId={connectionId} />
                : <EditCommandForm commandData={data}>
                    <CommandDetailSection isDisabled={mode === 'edit'} />

                    <EditCommandSection commandData={data} />

                    <SubmitButtonSection />
                </EditCommandForm>
            }
        </ContentContainer>
    );
};

export const SubmitButtonSection = () => {
    return (
        <>
            <ContentDivider sx={{ mt: 3, mb: 2 }} />

            <Button label='Save Changes' type='submit' startWithIcon='AddCircle' variant='fullwidth' />
        </>
    );
};

export type EditCommandFormParameters = {
    commandName: string;
    description: string;
    namespace: string;
};

export type EditCommandFormProps = {
    commandData: CommandMappingModel | undefined;
    children: React.ReactNode;
};

export const EditCommandForm = ({ commandData, children }: EditCommandFormProps) => {
    const handleEditCommandSave = (values: any) => {
        console.log(values);
    };

    return (
        <Form<EditCommandFormParameters>
            initialValues={{
                commandName: commandData?.name || '',
                description: commandData?.description || '',
                namespace: commandData?.namespace || '',
            }}
            onSubmit={handleEditCommandSave}
        >
            {children}
        </Form>
    );
};
