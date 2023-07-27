// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { ContentContainer } from '@dolittle/design-system';

import {
    useConnectionsIdMessageMappingsTablesTableMessagesMessageGet,
    useConnectionsIdMessageMappingsTablesTableMessagesMessagePost
} from '../../../../../apis/integrations/messageMappingApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { ViewMode } from './ViewMode';
import { MessageMappingForm } from './components/MessageMappingForm';
import { ChangeMessageView } from './ChangeMessageView';

export const Index = () => {
    const location = useLocation();
    const connectionId = useConnectionIdFromRoute();
    const { table = '', messageId = '' } = useParams();

    const mode: ViewMode = location.pathname.endsWith('new') ? 'new' : 'edit';

    if (mode === 'edit' && (!table || !messageId)) {
        return <>Cannot crete new message without table or messageId</>;
    }

    const [selectedTableName, setSelectedTableName] = useState('');

    const messageQuery = useConnectionsIdMessageMappingsTablesTableMessagesMessageGet({ id: connectionId, table, message: messageId });
    const saveMessageMappingMutation = useConnectionsIdMessageMappingsTablesTableMessagesMessagePost();

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
        <ContentContainer>
            <MessageMappingForm
                connectionId={connectionId}
                selectedTableName={selectedTableName}
                messageId={messageId}
                messageType={messageType!}
                saveMessageMappingMutation={saveMessageMappingMutation}
            >
                <ChangeMessageView
                    mode={mode}
                    table={selectedTableName}
                    onTableSelected={setSelectedTableName}
                    messageId={messageId}
                    isSubmitting={saveMessageMappingMutation.isLoading}
                    messageType={messageType}
                    queryIsError={messageQuery.isError}
                    queryIsSuccess={messageQuery.isSuccess}
                />
            </MessageMappingForm>
        </ContentContainer>
    );
};
