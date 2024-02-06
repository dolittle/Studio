// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { LoadingSpinner, Tabs } from '@dolittle/design-system';

import { useConnectionsIdGet } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionIdFromRoute } from '../../routes.hooks';

import { PageTitle } from '../../../layout/PageTitle';
import { useRedirectToTabByStatus } from './useRedirectToTabByStatus';
import { getIndicatorStatusFromStatusMessage } from '../../statusHelpers';
import { connectionTabs, getSelectedTab } from './getConnectionTabs';

export const ConnectionDetails = () => {
    const location = useLocation();
    const connectionId = useConnectionIdFromRoute();

    const { isLoading, data } = useConnectionsIdGet({ id: connectionId });

    const connection = data?.value;
    const redirectPath = useRedirectToTabByStatus(connection?.status);

    if (isLoading) return <LoadingSpinner />;
    if (!connection) return null;

    const pageTitle = connection.name || 'Connection Details';
    const status = getIndicatorStatusFromStatusMessage(connection.status.statusMessage);

    return (
        <>
            {redirectPath
                ? <Navigate to={redirectPath} replace={true} />
                : <>
                    <PageTitle title={pageTitle} healthStatus={status?.status} healthStatusLabel={status?.label} healthStatusMessage={status?.message} />
                    <Tabs selectedTab={getSelectedTab(location)} tabs={connectionTabs} />
                    <Outlet />
                </>
            }
        </>
    );
};
