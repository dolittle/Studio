// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { NoEntityView } from '../../components/noEntityView/noEntityView';

export type NoConnectionsProps = {
    onCreateNew: () => void;
};

export const NoConnections = ({ onCreateNew }: NoConnectionsProps) =>
    <NoEntityView
        title='No connections established yet...'
        createEntityProps={{
            createEntityText: 'Set up M3 connection',
            createEntityIcon: 'PolylineRounded',
            onCreateEntity: onCreateNew,
        }}
        description='After you set up your first connection it will appear here.'
        subDescription='The Dolittle platform currently supports M3 integrations. We are looking to expand this in the future to other ERP systems,
            so be sure to check back in or let us know what your needs are!'
    />;
