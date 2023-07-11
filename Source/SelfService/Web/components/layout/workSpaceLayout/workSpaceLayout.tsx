// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Layout, LayoutProps } from '@dolittle/design-system';

import { usePageTitle } from '../../../utils/usePageTitle';

import { mainNavigationItems, applicationsSidePanel, integrationsSidePanel } from './workSpaceLayoutLinks';

export type WorkSpaceLayoutProps = {
    pageTitle: string;
    sidePanelMode?: 'applications' | 'integrations';
    breadcrumbs?: LayoutProps['breadcrumbs'];
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ pageTitle, sidePanelMode, breadcrumbs, children }: WorkSpaceLayoutProps) => {
    usePageTitle(pageTitle);

    return (
        <Layout
            navigationBar={mainNavigationItems}
            sidePanel={sidePanelMode === 'applications' ? applicationsSidePanel : integrationsSidePanel}
            breadcrumbs={breadcrumbs}
        >
            {children}
        </Layout>
    );
};

// TODO: Needs renaming and seperate component?
export const WorkSpaceWithoutSideBarLayout = ({ pageTitle, children }: WorkSpaceLayoutProps) => {
    usePageTitle(pageTitle);

    return (
        <Layout navigationBar={mainNavigationItems}>
            {children}
        </Layout>
    );
};
