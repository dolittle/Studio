// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useEffect, useState } from 'react';

import { Connection, connectionsGet } from '../../apis/integrations/connections';
import { NoConnections } from './noConnections';
import { Page } from '../../components/layout/page';
import { ConnectionsTable } from './connectionsTable';
import { CreateConnectionButton } from './createConnectionButton';

export const Connections = () => {
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        connectionsGet()
            .then(connections => {
                setConnections(connections);
            })
            .catch(err => console.log('something went wrong', err));
    }, []);

    return (
        <Page title='Connections'>
            {connections.length
                ? (
                    <>
                        <ConnectionsTable connections={connections} isLoading={false} />
                        <CreateConnectionButton onClick={() => {}} />
                    </>
                ) : (
                    <NoConnections />
                )
            }
        </Page>
    );
};
