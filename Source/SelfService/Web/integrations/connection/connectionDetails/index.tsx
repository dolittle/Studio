// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { useConnectionId } from '../../routes.hooks';

import { Tabs } from '@dolittle/design-system';

import { Page } from '../../../components/layout/page';

export const ConnectionDetails = () => {
    const navigate = useNavigate();
    const connectionId = useConnectionId();

    //console.log('connectionId', connectionId);

    // Get connection name
    // Show status

    // TODO: Don't know what to do with `render` yet.
    return (
        <Page title='Connection Details'>
            <Tabs
                tabs={[
                    {
                        label: 'Configuration',
                        handleNavigate: () => navigate('configuration'),
                        render: () => <></>,
                    },
                    {
                        label: 'Messages',
                        handleNavigate: () => navigate('messages'),
                        render: () => <></>,
                    },
                    {
                        label: 'Expose Data',
                        handleNavigate: () => navigate('expose'),
                        render: () => <></>,
                    },
                ]}
            />
            <Outlet />
        </Page>
    );
};
