// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Outlet, Link, useLocation, Location } from 'react-router-dom';

import { useConnectionsIdGet } from '../../../apis/integrations/connectionsApi.hooks';

import { useConnectionId } from '../../routes.hooks';

import { StatusIndicatorProps, Tabs } from '@dolittle/design-system';

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

const connectionHealthStatus = (status: string): StatusIndicatorProps => {
    if (status === 'connected') {
        return {
            status: 'success',
            label: 'connected',
        };
    } else if (status === 'registered' || status === 'pending') {
        return {
            status: 'warning',
            label: 'pending',
        };
    } else if (status === 'failing') {
        return {
            status: 'error',
            label: 'failing',
        };
    }

    return { status: 'unknown' };
};

export const ConnectionDetails = () => {
    const location = useLocation();
    const connectionId = useConnectionId();
    const query = useConnectionsIdGet({ id: connectionId || '' });
    const data = query.data?.value;

    if (query.isLoading) return <>Loading</>;
    if (!data || !connectionId) return null;

    const pageTitle = data.name || 'Connection Details';
    const status = data.status?.name?.toLocaleLowerCase() || 'unknown';

    return (
        <Page
            title={pageTitle}
            healthStatus={connectionHealthStatus(status).status}
            healthStatusLabel={connectionHealthStatus(status).label}
            sx={{ mb: 4 }}
        >
            <Tabs selectedTab={getCurrentTab(location)} tabs={tabs} />
            <Outlet />
        </Page>
    );
};
