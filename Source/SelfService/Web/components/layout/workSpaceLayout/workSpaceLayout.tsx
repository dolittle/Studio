// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Layout } from '@dolittle/design-system';

import { mainLinks, secondaryLinks, selectionMenuItems } from './workSpaceLayoutLinks';

type WorkSpaceLayoutProps = {
    children: React.ReactNode;
};

export const WorkSpaceLayout = ({ children }: WorkSpaceLayoutProps) =>
    <Layout
        logo='AigonixLightCube'
        primaryNavigationItems={mainLinks}
        secondaryNavigationItems={secondaryLinks}
        selectionMenuItems={selectionMenuItems}
    >
        {children}
    </Layout>;
