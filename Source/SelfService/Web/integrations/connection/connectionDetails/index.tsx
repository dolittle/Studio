// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link, Location, Navigate, Outlet, useLocation } from 'react-router-dom';

import { Tabs } from '@dolittle/design-system';

import { useConnectionsIdGet } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionIdFromRoute } from '../../routes.hooks';

import { PageTitle } from '../../../layout/PageTitle';
import { useRedirectToTabByStatus } from './useRedirectToTabByStatus';
import { getIndicatorStatusFromStatusMessage } from '../../statusHelpers';

export const childRoutePaths = ['/configuration', '/messages', '/consume-data-rest-api', '/consume-data-event-streams'];

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
        label: 'Consume Data (Rest API)',
        render: () => <></>,
        overrides: {
            component: Link,
            to: 'consume-data-rest-api',
        },
    },
    {
        label: 'Consume Data (Event Streams)',
        render: () => <></>,
        overrides: {
            component: Link,
            to: 'consume-data-event-streams',
        },
    },
];

export const ConnectionDetails = () => {
    const location = useLocation();
    const connectionId = useConnectionIdFromRoute();
    const { isLoading, data } = useConnectionsIdGet({ id: connectionId });

    const connection = data?.value;
    const redirectPath = useRedirectToTabByStatus(connection?.status);

    if (isLoading) return <>Loading</>;
    if (!connection) return null;

    const pageTitle = connection.name || 'Connection Details';
    const status = getIndicatorStatusFromStatusMessage(connection.status.statusMessage);

    return (
        <>
            {redirectPath
                ? <Navigate to={redirectPath} replace={true} />
                : <>
                    <PageTitle title={pageTitle} healthStatus={status?.status} healthStatusLabel={status?.label} healthStatusMessage={status?.message} />
                    <Tabs selectedTab={getSelectedTab(location)} tabs={tabs} />
                    <Outlet />
                </>
            }
        </>
    );
};
