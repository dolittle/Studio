// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { Box } from '@mui/material';
import { AlertBox, ContentContainer, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsGet } from '../../../../../apis/integrations/messageMappingApi.hooks';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';

import { MessagesTable } from './MessagesTable';
import { CreateMessagesButton } from './CreateMessagesButton';
import { NoMessages } from './NoMessages';
import { isDefaultEmptyDate } from './helpers';
import { MessagesHeader } from './MessagesHeader';
import { useQueryClient } from '@tanstack/react-query';


export const MessagesListView = () => {
    const connectionId = useConnectionIdFromRoute();
    const navigate = useNavigate();
    const [selectedMessageTypeIds, setSelectedMessageTypeIds] = useState<string[]>([]);
    const queryClient = useQueryClient();

    const { data, isError, isLoading } = useConnectionsIdMessageMappingsGet({ id: connectionId });

    const handleCreateNewMessage = () => {
        navigate('new');
    };

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

    const selectedMessageTypeRows = useMemo(() =>
        messageTypesRows.filter(row => selectedMessageTypeIds.includes(row.id))
        , [messageTypesRows, selectedMessageTypeIds]);

    const handleActionCompleted = () => {
        setSelectedMessageTypeIds([]);
        window.setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ConnectionMessageMappings_GET, connectionId] });
        }, 300);
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <AlertBox />;

    return (
        messageTypesRows.length ?
            <>
                <ContentContainer>
                    <MessagesHeader
                        connectionId={connectionId}
                        selectedMessageTypes={selectedMessageTypeRows}
                        onActionSuccess={handleActionCompleted}
                    />
                    <MessagesTable
                        rows={messageTypesRows}
                        initialSelectedIds={selectedMessageTypeIds}
                        onSelectedIdsChanged={setSelectedMessageTypeIds}
                    />
                </ContentContainer>
                <CreateMessagesButton onClick={() => { handleCreateNewMessage(); }} />
            </> :
            <NoMessages onCreateNew={() => { handleCreateNewMessage(); }} />
    );
};
