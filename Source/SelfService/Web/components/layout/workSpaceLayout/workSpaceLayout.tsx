// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Layout } from '@dolittle/design-system';

import { primaryNavigationItems, secondaryNavigationItems, selectionMenuItems, SideBarPrimaryLinks, SideBarSecondaryLinks } from './workSpaceLayoutLinks';

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Layout
        navigationBar={{
            logo: 'AigonixLightCube',
            primaryNavigationItems,
            secondaryNavigationItems,
            selectionMenuItems,
        }}
        sideBar={{
            primaryLinks: <SideBarPrimaryLinks />,
            secondaryLinks: <SideBarSecondaryLinks />,
        }}
    >
        {children}
    </Layout>;
