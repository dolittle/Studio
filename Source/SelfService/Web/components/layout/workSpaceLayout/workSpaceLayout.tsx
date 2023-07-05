// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Layout, LayoutProps } from '@dolittle/design-system';

import { usePageTitle } from '../../../utils/usePageTitle';

import { PrimaryNavigation, SecondaryNavigation, SidePanelApplicationItems, SidePanelIntegrationItems } from './workSpaceLayoutLinks';
import { SpaceSelectMenu } from './spaceSelectMenu';

const mainNavigationItems: LayoutProps['navigationBar'] = {
    logo: 'AigonixLightCube',
    primaryNavigationItems: <PrimaryNavigation />,
    selectionMenuItems: <SpaceSelectMenu />,
    secondaryNavigationItems: <SecondaryNavigation />,
};

const applicationsSidePanel: LayoutProps['sidePanel'] = {
    sidePanelNavigationItems: <SidePanelApplicationItems />,
};

const integrationsSidePanel: LayoutProps['sidePanel'] = {
    sidePanelNavigationItems: <SidePanelIntegrationItems />,
};

export type WorkSpaceLayoutProps = {
    sidePanelMode?: 'applications' | 'integrations';
    children: React.ReactNode;
};

export type WorkSpaceWithoutSideBarLayoutProps = WorkSpaceLayoutProps & {
    pageTitle: string;
};

export const WorkSpaceLayout = ({ sidePanelMode, children }: WorkSpaceLayoutProps) =>
    <Layout navigationBar={mainNavigationItems} sidePanel={sidePanelMode === 'applications' ? applicationsSidePanel : integrationsSidePanel}>
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
