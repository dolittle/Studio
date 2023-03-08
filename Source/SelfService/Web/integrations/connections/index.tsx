// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { } from 'react';

import { NoConnections } from './noConnections';
import { Page } from '../../components/layout/page';
import { ConnectionsTable } from './connectionsTable';
import { useConnectionsGet } from '../../apis/integrations/useConnectionsGet';
import { CreateConnectionButton } from './createConnectionButton';

export const Connections = () => {
    const { data, isInitialLoading, isFetching, isError } = useConnectionsGet();
    const connections = data || [];

    return (
        <Page title='Connections'>
            {isFetching || connections.length
                ? (
                    <>
                        <ConnectionsTable connections={connections} isLoading={isFetching} />
                        <CreateConnectionButton onClick={() => { }} buttonProps={{ disabled: isFetching }} />
                    </>
                ) : (
                    <NoConnections />
                )
            }
        </Page>
    );
};
