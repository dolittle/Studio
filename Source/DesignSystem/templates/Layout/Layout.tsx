// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar, Grid, SxProps } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { MainLinks, SecondaryLinks, SelectionMenu, ResponsiveSecondaryLinks, SideBarPrimaryLinks, SideBarSecondaryLinks } from '../../helpers/dummyContent';

const styles: SxProps = {
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
    <Grid container sx={{ flexFlow: 'nowrap' }}>

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

        <Box component='main' sx={styles}>
            <Toolbar />

            {children}
        </Box>
    </Grid>;
