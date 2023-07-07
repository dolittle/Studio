// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Grid, SxProps, Toolbar } from '@mui/material';

import { NavigationBar, NavigationBarProps, SidePanel, SidePanelProps, Breadcrumbs, BreadcrumbsProps } from '@dolittle/design-system';

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
     * The navigation bar that will be displayed at the top of the layout.
     */
    navigationBar: NavigationBarProps;

    /**
     * The side bar that will be displayed on the left of the layout.
     */
    sidePanel?: SidePanelProps;

    /**
     * The breadcrumbs items that will be displayed at the top of the layout.
     */
    breadcrumbs?: BreadcrumbsProps;

    /**
     * The main content of the layout.
     */
    children: React.ReactNode;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * The layout component is the main component that contains the navigation bar and the side bar.
 * @param {LayoutProps} props - The {@link LayoutProps}.
 * @returns A {@link Layout} component.
 */
export const Layout = ({ navigationBar, sidePanel, breadcrumbs, children, sx }: LayoutProps) =>
    <Grid container sx={{ flexFlow: 'nowrap' }}>
        <NavigationBar {...navigationBar} />

        {sidePanel && <SidePanel {...sidePanel} />}

        <Box component='main' sx={{ ...styles, ...sx }}>
            {sidePanel &&
                <Toolbar>
                    {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
                </Toolbar>
            }
            {children}
        </Box>
    </Grid>;
