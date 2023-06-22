// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Layout } from '@dolittle/design-system';

import { primaryNavigationItems, secondaryNavigationItems, selectionMenuItems } from '../components/layout/workSpaceLayout/workSpaceLayoutLinks';

export const HomeScreen = () => {
    return (
        <Layout
            navigationBar={{
                logo: 'AigonixLightCube',
                primaryNavigationItems,
                secondaryNavigationItems,
                selectionMenuItems,
            }}
        >
            Home Screen
        </Layout>
    );
};
