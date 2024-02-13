// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

//import { useQueryClient } from '@tanstack/react-query';

import { ContentContainer, ContentDivider, ContentHeader, CreateButton } from '@dolittle/design-system';

//import { CACHE_KEYS } from '../../../../../../apis/integrations/CacheKeys';

import { CommandsListDataGrid } from './commandsListDataGrid';

export type CommandsListViewProps = {
    //connectionId: string;
    //messageTypesRows: any[];
    onNewCommandCreated: () => void;
};

export const CommandsListView = ({ onNewCommandCreated }: CommandsListViewProps) => {
    // const queryClient = useQueryClient();

    // const [selectedMessageTypeIds, setSelectedMessageTypeIds] = useState<string[]>([]);

    // const selectedMessageTypeRows = useMemo(() =>
    //     messageTypesRows.filter(row => selectedMessageTypeIds.includes(row.id))
    //     , [messageTypesRows, selectedMessageTypeIds]);

    // const handleActionCompleted = () => {
    //     setSelectedMessageTypeIds([]);

    //     window.setTimeout(() => {
    //         queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.ConnectionMessageMappings_GET, connectionId] });
    //     }, 300);
    // };

    return (
        <>
            <ContentContainer>
                <ContentHeader title='Your Commands' titleTextVariant='subtitle' />

                <ContentDivider sx={{ mb: 2 }} />

                <CommandsListDataGrid />
            </ContentContainer>

            <CreateButton label='Create New Command' icon='AddCircle' onCreate={onNewCommandCreated} sx={{ maxWidth: 1200, mt: 0 }} />
        </>
    );
};
