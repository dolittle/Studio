// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { MainLinks, SecondaryLinks, SelectionMenu, ResponsiveSecondaryLinks, SideBarPrimaryLinks, SideBarSecondaryLinks } from '../../helpers/dummyContent';

/**
 * The props for a {@link Layout} component.
 */
type LayoutProps = {
    /**
     * The main content of the layout.
     * @default undefined
     */
    children: React.ReactNode;
};

/**
 * The layout component is the main component that contains the navigation bar and the side bar.
 * @param {LayoutProps} props - The {@link LayoutProps} that contains the properties for layout component.
 * @returns A {@link Layout} component.
 */
export const Layout = ({ children }: LayoutProps) =>
    <Box sx={{ display: 'flex' }}>
        <NavigationBar
            mainLinks={<MainLinks />}
            secondaryLinks={<SecondaryLinks />}
            responsiveDropdownMenu={<SelectionMenu />}
            responsiveSecondaryLinks={<ResponsiveSecondaryLinks />}
        />

        <SideBar
            primaryLinks={<SideBarPrimaryLinks />}
            secondaryLinks={<SideBarSecondaryLinks />}
        />

        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />

            {children}
        </Box>
    </Box>;
