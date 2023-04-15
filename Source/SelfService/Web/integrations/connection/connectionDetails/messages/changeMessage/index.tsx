// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
    useConnectionsIdMessageMappingsTablesTableMessagesMessageGet,
    useConnectionsIdMessageMappingsTablesTableMessagesMessagePost
} from '../../../../../apis/integrations/messageMappingApi.hooks';
import { useConnectionId } from '../../../../routes.hooks';

import { ViewMode } from './ViewMode';
import { ContentContainer } from './components/ContentContainer';
import { MessageMappingForm } from './components/MessageMappingForm';
import { ChangeMessageView } from './ChangeMessageView';



export const Index = () => {

    const location = useLocation();
    const { table, messageId } = useParams();
    const connectionId = useConnectionId();

    const [selectedTableName, setSelectedTableName] = useState('');

    const messageQuery = useConnectionsIdMessageMappingsTablesTableMessagesMessageGet({ id: connectionId!, table: table!, message: messageId! });
    const saveMessageMappingMutation = useConnectionsIdMessageMappingsTablesTableMessagesMessagePost();

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';
    const messageType = messageQuery.data?.value;

    if (mode === 'edit' && table && !selectedTableName) {
        setSelectedTableName(table);
    }


    // TODO: Implement this.
    // Prevent the user from accidentally closing the browser tab if they have unsaved changes.

    // window.addEventListener('beforeunload', (event) => {
    //     event.preventDefault();
    //     return event.returnValue = 'Are you sure you want to close?';
    // });

    // TODO: Implement this.



    return (
        <>
            <ContentContainer>
                <MessageMappingForm
                    connectionId={connectionId!}
                    selectedTableName={selectedTableName}
                    messageId={messageId!}
                    messageType={messageType!}
                    saveMessageMappingMutation={saveMessageMappingMutation}
                >
                    <ChangeMessageView
                        mode={mode}
                        isSubmitting={saveMessageMappingMutation.isLoading}
                    />
                </MessageMappingForm>
            </ContentContainer>
        </>
    );
};
