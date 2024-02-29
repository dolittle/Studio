// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useConnectionsIdCommandsGet } from '../../../../../apis/integrations/commandMappingApi.hooks';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CommandsListView } from './commandsListView';
import { NoCommandsView } from './NoCommandsView';

export const CommandsView = () => {
    const navigate = useNavigate();
    const connectionId = useConnectionIdFromRoute();

    const [hasRows, setHasRows] = useState(true);

    const { data, isError, isLoading } = useConnectionsIdCommandsGet({ id: connectionId });

    console.log(data, 'commands data');

    // const messageTypesRows = useMemo(() => {
    //     const mappedRows = data?.value || [];

    //     mappedRows.sort((a, b) => {
    //         if (isDefaultEmptyDate(a.deployedAt)) {
    //             // If both are not deployed, sort by created date, newest first
    //             // otherwise, a is not deployed and b is, so a should be first
    //             return isDefaultEmptyDate(b.deployedAt)
    //                 ? b.createdAt.getTime()! - a.createdAt.getTime()!
    //                 : -1;
    //         } else {
    //             // If a is deployed and b is not, then a should be first
    //             // Otherwise if both are deployed, sort by deployed date, newest first
    //             return isDefaultEmptyDate(b.deployedAt)
    //                 ? 1
    //                 : b.deployedAt?.getTime()! - a.deployedAt?.getTime()!;
    //         };
    //     });

    //     return mappedRows;
    // }, [data?.value]);

    // if (isLoading) return <LoadingSpinner />;
    // if (isError) return <AlertBox />;

    const handleCreateNewCommand = () => {
        navigate('new');
    };

    return (
        <>
            {hasRows
                ? <CommandsListView onNewCommandCreated={handleCreateNewCommand} />
                : <NoCommandsView onNewCommandCreated={handleCreateNewCommand} />
            }
        </>
    );
};
