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

    const messageTypesRows = data?.value?.map(mapping => ({
        id: mapping.id!,
        ...mapping
    })) || [];

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <AlertBox />;

    return (
        messageTypesRows.length ?
            <>
                <MessagesTable rows={messageTypesRows} />
                <CreateMessagesButton onClick={() => { handleCreateNewMessage(); }} />
            </> :
            <NoMessages onCreateNew={() => { handleCreateNewMessage(); }} />
    );
};
