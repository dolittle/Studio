// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { useConnectionId } from '../../../../routes.hooks';

import { AlertBox, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsGet } from '../../../../../apis/integrations/messageMappingApi.hooks';

import { MessagesTable } from './MessagesTable';
import { CreateMessagesButton } from './CreateMessagesButton';
import { NoMessages } from './NoMessages';

export const MessagesListView = () => {
    const connectionId = useConnectionId();
    const navigate = useNavigate();
    const { data, isError, isLoading } = useConnectionsIdMessageMappingsGet({ id: connectionId || '' });
    const handleCreateNewMessage = () => {
        navigate('new');
    };

    //console.log(data?.value);

    const messagesDataRows = data?.value?.map(message => ({
        id: message.id,
        name: message.name,
        description: message.description,
        // type: message.type,
        // createdAt: message.createdAt,
        // updatedAt: message.updatedAt,
        //actions: <Outlet state={{ message }} />,
    })) || [];

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <AlertBox />;

    return (
        messagesDataRows.length ?
            <>
                <MessagesTable rows={messagesDataRows} />
                <CreateMessagesButton onClick={() => { handleCreateNewMessage(); }} />
            </> :
            <NoMessages onCreateNew={() => { handleCreateNewMessage(); }} />
    );
};
