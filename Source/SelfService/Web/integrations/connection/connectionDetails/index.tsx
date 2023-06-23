// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { Link, Location, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useConnectionsIdGet } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionId } from '../../routes.hooks';
import { Tabs } from '@dolittle/design-system';
import { getConnectionStatus } from '../../../utils/helpers/connectionStatuses';
import { Page } from '../../../components/layout/page';

//TODO: Make this dynamic based on current url in the tab component
const getCurrentTab = (location: Location) => {
    if (location.pathname.includes('configuration')) return 0;
    else if (location.pathname.includes('messages')) return 1;
    else if (location.pathname.includes('expose')) return 2;
    else return 0;
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

const pendingStatuses = ['registered', 'pending'];
const childRoutePaths = ['configuration', 'messages', 'expose'];

export const ConnectionDetails = () => {
    const location = useLocation();
    const connectionId = useConnectionId();
    const query = useConnectionsIdGet({ id: connectionId || '' });
    const data = query.data?.value;

    const redirectUrl = useMemo(() => {
        if (!query.data?.value || childRoutePaths.some((path) => location.pathname.endsWith(path))) {
            return null;
        } else {
            return pendingStatuses.includes(query.data.value.status?.name?.toLowerCase())
                ? 'configuration'
                : 'messages';
        }
    }, [query.data?.value, location.pathname]);

    if (query.isLoading) return <>Loading</>;
    if (!data || !connectionId) return null;

    const pageTitle = data.name || 'Connection Details';
    const status = data.status?.name?.toLocaleLowerCase();


    return (
        <>
            {redirectUrl
                ? <Navigate to={redirectUrl} replace={true} />
                : <Page
                    title={pageTitle}
                    healthStatus={getConnectionStatus(status).status}
                    healthStatusLabel={getConnectionStatus(status).label}
                    sx={{ mb: 4 }}
                >
                    <Tabs selectedTab={getCurrentTab(location)} tabs={tabs} />
                    <Outlet />
                </Page>
            }
        </>
    );
};
