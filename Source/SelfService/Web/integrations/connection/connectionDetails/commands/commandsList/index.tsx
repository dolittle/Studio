// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { CommandsListView } from './commandsListView';
import { NoCommandsView } from './NoCommandsView';

export const CommandsView = () => {
    const [hasRows, setHasRows] = useState(true);

    // const handleCommandCreate = ({ name, nameSpace, description }: CommandsFormParameters) => {
    //    // setIsCreatingCommand(true);

    //     const data = {
    //         name,
    //         nameSpace,
    //         description,
    //     };

    //     setHasRows(true);

    //     //setIsCreateDialogOpen(false);
    //    // setIsCreatingCommand(false);
    // };
    // const handleCreateNewMessage = () => {
    //     navigate('new');
    // };
    // if (isCommandsListPageLoading) return <LoadingSpinner />;
    // if (isLoading) return <LoadingSpinner />;
    // if (isError) return <AlertBox />;

    return (
        <>
            {hasRows
                ? <CommandsListView onNewCommandCreated={() => { }} />
                : <NoCommandsView onNewCommandCreated={() => { }} />
            }
        </>
    );
};
