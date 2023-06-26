// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { Link, Location, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useConnectionsIdGet } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionId } from '../../routes.hooks';
import { Tabs } from '@dolittle/design-system';
import { getConnectionStatus } from '../../../utils/helpers/connectionStatuses';
import { Page } from '../../../components/layout/page';
import { useRedirectToTabByStatus } from './useRedirectToTabByStatus';

export const childRoutePaths = ['/configuration', '/messages', '/expose'];

const getSelectedTab = (location: Location) => {
    const pathname = location.pathname;
    const foundIndex = childRoutePaths.findIndex((path) => pathname.includes(path));
    return foundIndex >= 0 ? foundIndex : 0;
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

export const ConnectionDetails = () => {
    const location = useLocation();
    const connectionId = useConnectionId();
    const { isLoading, data } = useConnectionsIdGet({ id: connectionId || '' });
    const connection = data?.value;

    const redirectPath = useRedirectToTabByStatus(connection?.status);

    if (isLoading) return <>Loading</>;
    if (!connection || !connectionId) return null;

    const pageTitle = connection.name || 'Connection Details';
    const status = connection.status?.name?.toLocaleLowerCase();

    return (
        <>
            {redirectPath
                ? <Navigate to={redirectPath} replace={true} />
                : <Page
                    title={pageTitle}
                    healthStatus={getConnectionStatus(status).status}
                    healthStatusLabel={getConnectionStatus(status).label}
                    sx={{ mb: 4 }}
                >
                    <Tabs selectedTab={getSelectedTab(location)} tabs={tabs} />
                    <Outlet />
                </Page>
            }
        </>
    );
};

