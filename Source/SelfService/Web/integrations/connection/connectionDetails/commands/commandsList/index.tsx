// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { AlertBox, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdCommandsGet } from '../../../../../apis/integrations/commandMappingApi.hooks';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CommandsListView } from './commandsListView';
import { NoCommandsView } from './NoCommandsView';

export const CommandsView = () => {
    const navigate = useNavigate();
    const connectionId = useConnectionIdFromRoute();

    const { data, isError, isLoading } = useConnectionsIdCommandsGet({ id: connectionId });

    const sortedCommandsRows = useMemo(() => data?.sort((a, b) => b.createdAt! > a.createdAt! ? 1 : -1) || [], [data]);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <AlertBox />;

    const handleCreateNewCommand = () => {
        navigate('new');
    };

    return (
        <>
            {sortedCommandsRows.length
                ? <CommandsListView commandListRows={sortedCommandsRows} onNewCommandCreated={handleCreateNewCommand} />
                : <NoCommandsView onNewCommandCreated={handleCreateNewCommand} />
            }
        </>
    );
};
