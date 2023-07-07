// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Layout, LayoutProps } from '@dolittle/design-system';

import { usePageTitle } from '../../../utils/usePageTitle';

import { mainNavigationItems, applicationsSidePanel, integrationsSidePanel } from './workSpaceLayoutLinks';

export type WorkSpaceLayoutProps = {
    sidePanelMode?: 'applications' | 'integrations';
    breadcrumbs?: LayoutProps['breadcrumbs'];
    children: React.ReactNode;
};

export type WorkSpaceWithoutSideBarLayoutProps = WorkSpaceLayoutProps & {
    pageTitle: string;
};

export const WorkSpaceLayout = ({ sidePanelMode, breadcrumbs, children }: WorkSpaceLayoutProps) =>
    <Layout
        navigationBar={mainNavigationItems}
        sidePanel={sidePanelMode === 'applications' ? applicationsSidePanel : integrationsSidePanel}
        breadcrumbs={breadcrumbs}
    >
        {children}
    </Layout>;

// TODO: Needs renaming and seperate component?
export const WorkSpaceWithoutSideBarLayout = ({ pageTitle, children }: WorkSpaceWithoutSideBarLayoutProps) => {
    usePageTitle(pageTitle);

    return (
        <Layout navigationBar={mainNavigationItems}>
            {children}
        </Layout>
    );
};
