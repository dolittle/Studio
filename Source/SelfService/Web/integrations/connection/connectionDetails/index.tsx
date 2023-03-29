// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';

import { Outlet, Link, useNavigate } from 'react-router-dom';

import { useConnectionId } from '../../routes.hooks';

import { Tabs } from '@dolittle/design-system';

import { Page } from '../../../components/layout/page';

export const ConnectionDetails = () => {
    const connectionId = useConnectionId();
    const navigate = useNavigate();

    // Route to messages tab by default. Hack?
    useEffect(() => {
        navigate('messages');
    }, []);

    return (
        <Page title='Connection Details'>
            <Tabs
                selectedTab={1}
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
