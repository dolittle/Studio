// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { usePageTitle } from '../../../utils/usePageTitle';

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

export type WorkSpaceLayoutProps = {
    pageTitle: string;
    children: React.ReactNode;
};

export type WorkSpaceWithoutSideBarLayoutProps = WorkSpaceLayoutProps & {
    pageTitle: string;
};

export const WorkSpaceLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Layout navigationBar={mainNavigationItems} sideBar={sideBarNavigationItems}>
        {children}
    </Layout>;

export const WorkSpaceWithoutSideBarLayout = ({ pageTitle, children }: WorkSpaceWithoutSideBarLayoutProps) => {
    usePageTitle(pageTitle);

    return (
        <Layout navigationBar={mainNavigationItems}>
            {children}
        </Layout>
    );
};
