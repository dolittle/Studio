// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useParams } from 'react-router-dom';

import { AlertBox, Button, ContentContainer, ContentDivider, ContentHeader, Form, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdCommandsCommandIdGet } from '../../../../../apis/integrations/commandMappingApi.hooks';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CommandCancelButton } from './CommandCancelButton';
import { NewCommandView } from './newCommand';
import { CommandDetailSection } from './CommandDetailSection';
import { EditCommandSection } from './editCommand';

export type ViewMode = 'new' | 'edit';

export type EditCommandFormParameters = {
    commandName: string;
    description: string;
    namespace: string;
};

export const CommandView = () => {
    const connectionId = useConnectionIdFromRoute();
    const { commandId = '' } = useParams();

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';

    if (mode === 'edit' && (!commandId)) return <AlertBox />;

    const { data, isError, isLoading } = useConnectionsIdCommandsCommandIdGet({ id: connectionId, commandId });

    if (mode === 'edit' && isError) return <AlertBox />;
    if (mode === 'edit' && isLoading) return <LoadingSpinner />;

    const handleEditCommandSave = (values: any) => {
        console.log(values);
    };

    const title = mode === 'new' ? 'Create New Command' : `Edit Command - ${data?.name || 'N/A'}`;

    return (
        <ContentContainer>
            <ContentHeader title={title} buttonsSlot={<CommandCancelButton />} sx={{ pb: 0 }} />

            {mode === 'new'
                ? <NewCommandView connectionId={connectionId} />
                : <Form<EditCommandFormParameters>
                    initialValues={{
                        commandName: data?.name || '',
                        description: data?.description || '',
                        namespace: data?.namespace || '',
                    }}
                    onSubmit={handleEditCommandSave}
                >
                    <CommandDetailSection isDisabled={mode === 'edit'} />

                    <EditCommandSection commandData={data} />
                </Form>
            }
        </ContentContainer>
    );
};
