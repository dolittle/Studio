// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Outlet, Link, useLocation, Location } from 'react-router-dom';

import { useConnectionsIdGet } from '../../../apis/integrations/connectionsApi.hooks';

import { useConnectionId } from '../../routes.hooks';

import { Tabs } from '@dolittle/design-system';

import { Page } from '../../../components/layout/page';

const getCurrentTab = (location: Location) => {
    if (location.pathname.includes('configuration')) return 0;
    if (location.pathname.includes('messages')) return 1;
    if (location.pathname.includes('expose')) return 2;

    return 0;
};

const tabs = [
    {
        label: 'configuration',
        render: () => <></>,
        overrides: {
            component: Link,
            to: 'configuration',
        },
    },
    {
        label: 'message types',
        render: () => <></>,
        overrides: {
            component: Link,
            to: 'messages',
        },
    },
    {
        label: 'expose data',
        render: () => <></>,
        overrides: {
            component: Link,
            to: 'expose',
        },
    },
];

const pageHealthStatus = (status: string) => {
    if (status === 'registered' || status === 'pending') return 'pending';
    return status;
};

export const ConnectionDetails = () => {
    const location = useLocation();
    const connectionId = useConnectionId();
    const query = useConnectionsIdGet({ id: connectionId || '' });

    if (query.isLoading) return <>Loading</>;
    if (!query.data?.value || !connectionId) return null;

    const pageTitle = query.data.value.name || 'Connection Details';
    const status = query.data.value.status?.name?.toLocaleLowerCase() || 'N/A';

    return (
        <Page title={pageTitle} healthStatus={pageHealthStatus(status)} sx={{ mb: 4 }}>
            <Tabs selectedTab={getCurrentTab(location)} tabs={tabs} />
            <Outlet />
        </Page>
    );
};
