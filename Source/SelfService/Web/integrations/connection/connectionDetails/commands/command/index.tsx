// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Button, ContentContainer, ContentHeader, Form } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { NewCommandDetailSection } from './newCommand/NewCommandDetailSection';
import { EditCommandSection } from './commandsListDetailPanel';

import { NewCommandView } from './newCommand';

export type ViewMode = 'new' | 'edit';

export const CommandView = () => {
    const navigate = useNavigate();
    const connectionId = useConnectionIdFromRoute();
    const { commandName = '' } = useParams();

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';
    const title = mode === 'new' ? 'Create New Command' : `Edit Command - ${commandName}`;
    //const showTable = !!table || mode === 'edit';

    const handleCommandCancel = () => {
        navigate('..');
    };

    const handleEditCommandSave = (values: any) => {
        console.log(values);
    };

    return (
        <ContentContainer>
            <ContentHeader
                title={title}
                buttonsSlot={<Button label='Cancel' startWithIcon='CancelRounded' color='subtle' onClick={handleCommandCancel} />}
                sx={{ pb: 0 }}
            />

            {mode === 'new'
                ? <NewCommandView connectionId={connectionId} />
                : <Form
                    initialValues={{
                        commandName: commandName || '',
                        commandDescription: '',
                        namespace: '',
                    }}
                    onSubmit={handleEditCommandSave}
                >
                    <NewCommandDetailSection />

                    <EditCommandSection />
                </Form>
            }
        </ContentContainer>
    );
};
