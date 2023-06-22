// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { NavigationBar, NavigationBarProps, SideBar } from '@dolittle/design-system';

import { SideBarPrimaryLinks, SideBarSecondaryLinks } from '../../helpers/ReactRouter';

/**
 * The props for a {@link Layout} component.
 */
export type LayoutProps = NavigationBarProps & {
    /**
     * The main content of the layout.
     */
    children: React.ReactNode;
};

/**
 * The layout component is the main component that contains the navigation bar and the side bar.
 * @param {LayoutProps} props - The {@link LayoutProps}.
 * @returns A {@link Layout} component.
 */
export const Layout = ({ children, ...navigationBar }: LayoutProps) =>
    <Box sx={{ display: 'flex' }}>
        <NavigationBar {...navigationBar} />

        <SideBar
            primaryLinks={<SideBarPrimaryLinks />}
            secondaryLinks={<SideBarSecondaryLinks />}
        />

        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />

            {children}
        </Box>
    </Box>;
