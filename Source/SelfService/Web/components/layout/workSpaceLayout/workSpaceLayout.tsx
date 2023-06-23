// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Layout, LayoutProps } from '@dolittle/design-system';

import { primaryNavigationItems, secondaryNavigationItems, selectionMenuItems, SideBarPrimaryLinks, SideBarSecondaryLinks } from './workSpaceLayoutLinks';

const mainNavigationItems: LayoutProps['navigationBar'] = {
    logo: 'AigonixLightCube',
    primaryNavigationItems,
    secondaryNavigationItems,
    //selectionMenuItems,
};

const sideBarNavigationItems: LayoutProps['sideBar'] = {
    primaryLinks: <SideBarPrimaryLinks />,
    secondaryLinks: <SideBarSecondaryLinks />,
};

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Layout navigationBar={mainNavigationItems} sideBar={sideBarNavigationItems}>
        {children}
    </Layout>;

export const WorkSpaceWithoutSideBarLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Layout navigationBar={mainNavigationItems}>
        {children}
    </Layout>;
