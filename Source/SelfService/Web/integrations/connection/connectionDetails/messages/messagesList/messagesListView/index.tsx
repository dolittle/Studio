// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ContentContainer, CreateButton } from '@dolittle/design-system';

import { CACHE_KEYS } from '../../../../../../apis/integrations/CacheKeys';

import { MessagesDataGridToolbar } from './messagesDataGridToolbar';
import { MessagesDataGrid } from './messagesDataGrid';

export type MessagesProps = {
    connectionId: string;
    messageTypesRows: any[];
    onNewMessageCreated: () => void;
};

export const Messages = ({ connectionId, messageTypesRows, onNewMessageCreated }: MessagesProps) => {
    const queryClient = useQueryClient();

    const [selectedMessageTypeIds, setSelectedMessageTypeIds] = useState<string[]>([]);

    const selectedMessageTypeRows = useMemo(() =>
        messageTypesRows.filter(row => selectedMessageTypeIds.includes(row.id))
        , [messageTypesRows, selectedMessageTypeIds]);

    const handleActionCompleted = () => {
        setSelectedMessageTypeIds([]);

        window.setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ConnectionMessageMappings_GET, connectionId] });
        }, 300);
    };

    return (
        <>
            <ContentContainer>
                <MessagesDataGridToolbar connectionId={connectionId} selectedMessageTypes={selectedMessageTypeRows} onActionSuccess={handleActionCompleted} />
                <MessagesDataGrid rows={messageTypesRows} initialSelectedIds={selectedMessageTypeIds} onSelectedIdsChanged={setSelectedMessageTypeIds} />
            </ContentContainer>

            <CreateButton label='Create New Message' icon='MessageRounded' onCreate={onNewMessageCreated} sx={{ maxWidth: 1200, mt: 0 }} />
        </>
    );
};
