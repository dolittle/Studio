// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Outlet } from 'react-router-dom';
import { useConnectionId } from '../../../routes.hooks';

import { useConnectionsIdMessageMappingsGet } from '../../../../apis/integrations/messageMappingApi.hooks';

import { MessagesTable } from './MessagesTable';

export const MessagesView = () => {
    const connectionId = useConnectionId();
    const query = useConnectionsIdMessageMappingsGet({ id: connectionId || '' });

    const messagesDataRows = query?.data?.value || [];

    console.log(query.data?.value);

    return (
        <>
            <MessagesTable rows={messagesDataRows} loading={query.isLoading} />
        </>
    );
};
