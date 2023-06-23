// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Grid, Toolbar } from '@mui/material';

import { NavigationBar, NavigationBarProps, SideBar, SideBarProps } from '@dolittle/design-system';

const styles = {
    'minHeight': 'calc(100vh - 96px)',
    'display': 'flex',
    'flexDirection': 'column',
    'flexGrow': 1,
    'm': 4,
    'mt': 8,
    '& .MuiToolbar-root': { p: 0 },
};

/**
 * The props for a {@link Layout} component.
 */
export type LayoutProps = {
    /**
     * The navigation bar that will be displayed at the top of the layout.
     */
    navigationBar: NavigationBarProps;

    /**
     * The side bar that will be displayed on the left of the layout.
     */
    sideBar?: SideBarProps;

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
export const Layout = ({ children, navigationBar, sideBar }: LayoutProps) =>
    <Grid container sx={{ flexFlow: 'nowrap' }}>
        <NavigationBar {...navigationBar} />

        {sideBar && <SideBar {...sideBar} />}

        <Box component='main' sx={styles}>
            {sideBar && <Toolbar />}
            {children}
        </Box>
    </Grid>;
