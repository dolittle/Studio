// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Grid, Toolbar } from '@mui/material';

import { NavigationBar, NavigationBarProps, SideBar } from '@dolittle/design-system';

import { SideBarPrimaryLinks, SideBarSecondaryLinks } from '../../helpers/ReactRouter';

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
    <Grid container sx={{ flexFlow: 'nowrap' }}>
        <NavigationBar {...navigationBar} />

        <SideBar
            primaryLinks={<SideBarPrimaryLinks />}
            secondaryLinks={<SideBarSecondaryLinks />}
        />

        <Box component='main' sx={styles}>
            <Toolbar />
            {children}
        </Box>
    </Grid>;
