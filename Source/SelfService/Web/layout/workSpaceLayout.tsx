// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Layout } from '@dolittle/design-system';

import { usePageTitle } from '../utils/usePageTitle';

import { applicationsSidePanel, integrationsSidePanel, mainNavigationItems } from './workSpaceLayoutLinks';

export type WorkSpaceLayoutProps = {
    pageTitle: string;
    sidePanelMode?: 'applications' | 'integrations';
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ pageTitle, children }: WorkSpaceLayoutProps) => {
    usePageTitle(pageTitle);

    return (
        <Layout navigationBar={mainNavigationItems}>
            {children}
        </Layout>
    );
};

export const WorkSpaceLayoutWithSidePanel = ({ pageTitle, sidePanelMode, children }: WorkSpaceLayoutProps) => {
    usePageTitle(pageTitle);

    const sidePanelLinks = sidePanelMode === 'applications' ? applicationsSidePanel : integrationsSidePanel;

    return (
        <Layout navigationBar={mainNavigationItems} sidePanel={sidePanelLinks}>
            {children}
        </Layout>
    );
};
