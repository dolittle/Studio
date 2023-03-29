// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Outlet, Link, useLocation, Location } from 'react-router-dom';

import { useConnectionId } from '../../routes.hooks';

import { Tabs } from '@dolittle/design-system';

import { Page } from '../../../components/layout/page';

const getCurrentTab = (location: Location) => {
    if (location.pathname.includes('configuration')) return 0;
    if (location.pathname.includes('messages')) return 1;
    if (location.pathname.includes('expose')) return 2;

    return 0;
};

export const ConnectionDetails = () => {
    const connectionId = useConnectionId();
    const location = useLocation();

    return (
        <Page title='Connection Details'>
            <Tabs
                selectedTab={getCurrentTab(location)}
                tabs={[
                    {
                        label: 'configuration',
                        render: () => <></>,
                        overrides: {
                            component: Link,
                            to: 'configuration',
                        },
                    },
                    {
                        label: 'messages',
                        render: () => <></>,
                        overrides: {
                            component: Link,
                            to: 'messages',
                        },
                    },
                    {
                        label: 'expose',
                        render: () => <></>,
                        overrides: {
                            component: Link,
                            to: 'expose',
                        },
                    },
                ]}
            />
            <Outlet />
        </Page>
    );
};
