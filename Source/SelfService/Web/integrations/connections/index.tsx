// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { } from 'react';

import { NoConnections } from './noConnections';
import { Page } from '../../components/layout/page';
import { ConnectionsTable } from './connectionsTable';
import { useConnectionsGet  } from '../../apis/integrations/connections.hooks';
import { CreateConnectionButton } from './createConnectionButton';

export const Connections = () => {
    const { data, isLoading, isFetching, isError, error } = useConnectionsGet();
    const connections = data?.value || [];
    return (
        <Page title='Connections'>
            {isError
                ? `We can't show your connections at this time. Please try again later.`
                : isLoading || connections.length
                    ? (
                        <>
                            <ConnectionsTable connections={connections} isLoading={isLoading} />
                            <CreateConnectionButton onClick={() => { }} buttonProps={{ disabled: isLoading }} />
                        </>
                    ) : (
                        <NoConnections />
                    )
            }
        </Page>
    );
};
