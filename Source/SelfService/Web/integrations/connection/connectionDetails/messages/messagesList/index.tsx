// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { AlertBox, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsGet } from '../../../../../apis/integrations/messageMappingApi.hooks';

import { Messages } from './messages';
import { NoMessages } from './NoMessages';

import { isDefaultEmptyDate } from './helpers';

export const MessagesListView = () => {
    const navigate = useNavigate();
    const connectionId = useConnectionIdFromRoute();

    const { data, isError, isLoading } = useConnectionsIdMessageMappingsGet({ id: connectionId });

    const messageTypesRows = useMemo(() => {
        const mappedRows = data?.value || [];

        mappedRows.sort((a, b) => {
            if (isDefaultEmptyDate(a.deployedAt)) {
                // If both are not deployed, sort by created date, newest first
                // otherwise, a is not deployed and b is, so a should be first
                return isDefaultEmptyDate(b.deployedAt)
                    ? b.createdAt.getTime()! - a.createdAt.getTime()!
                    : -1;
            } else {
                // If a is deployed and b is not, then a should be first
                // Otherwise if both are deployed, sort by deployed date, newest first
                return isDefaultEmptyDate(b.deployedAt)
                    ? 1
                    : b.deployedAt?.getTime()! - a.deployedAt?.getTime()!;
            };
        });

        return mappedRows;
    }, [data?.value]);

    const handleCreateNewMessage = () => {
        navigate('new');
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <AlertBox />;

    return (
        messageTypesRows.length
            ? <Messages connectionId={connectionId} messageTypesRows={messageTypesRows} onNewMessageCreated={handleCreateNewMessage} />
            : <NoMessages onCreateNew={handleCreateNewMessage} />
    );
};
