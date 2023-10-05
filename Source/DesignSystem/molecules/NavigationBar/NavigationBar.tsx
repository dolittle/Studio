// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, Drawer, Stack, Toolbar, Theme } from '@mui/material';

import { Icon, IconProps, IconButton } from '../../index';

const styles = {
    nav: { zIndex: (theme: Theme) => theme.zIndex.drawer + 1 },
    hideOnMobile: { display: { xs: 'none', md: 'flex' } },
    mobileNavigationBar: {
        width: 1,
        justifyContent: 'space-between',
        display: { xs: 'flex', md: 'none' },
    },
    mobileMenu: {
        '& .MuiDrawer-paper': {
            width: 1,
            justifyContent: 'center',
        },
    },
};

/**
 * The props for a {@link NavigationBar} component.
 */
export type NavigationBarProps = {
    /**
     * The logo to display in the navigation bar.
     */
    logo?: IconProps['icon'];

    /**
     * Primary links that appear to the left of the navigation bar.
     */
    primaryNavigationItems?: React.ReactNode;

    /**
     * Secondary links that appear to the right of the navigation bar.
     */
    secondaryNavigationItems?: React.ReactNode;

    /**
     * A drop-down menu that appears in the right of the navigation bar.
     */
    selectionMenuItems?: React.ReactNode;
};

/**
 * The navigation bar displays information and actions relating to the current screen.
 * @param {NavigationBarProps} props - The {@link NavigationBarProps}.
 * @returns A {@link NavigationBar} component.
 */
export const NavigationBar = ({ logo, primaryNavigationItems, secondaryNavigationItems, selectionMenuItems }: NavigationBarProps) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const handleMobileNavClose = () => setIsMobileNavOpen(false);

    return (
        <AppBar elevation={4} component='nav' sx={styles.nav}>
            {isMobileNavOpen &&
                <Drawer
                    variant='temporary'
                    open={isMobileNavOpen}
                    onClose={handleMobileNavClose}
                    onClick={handleMobileNavClose}
                    sx={styles.mobileMenu}
                >
                    <Toolbar />
                    <Stack gap={2}>{primaryNavigationItems}</Stack>
                </Drawer>
            }

            <Toolbar>
                <Box sx={styles.mobileNavigationBar}>
                    <IconButton
                        tooltipText={isMobileNavOpen ? 'Close' : 'Open'}
                        tooltipPlacement='bottom'
                        icon='MenuRounded'
                        edge='start'
                        onClick={() => setIsMobileNavOpen(prevState => !prevState)}
                    />
                    <Box>
                        {selectionMenuItems}
                        {secondaryNavigationItems}
                    </Box>
                </Box>

                <Box sx={{ ...styles.hideOnMobile, flexGrow: 1, alignItems: 'center', gap: 3 }}>
                    {logo && <IconButton tooltipText='Home' icon={logo} href='/' sx={{ mr: 2 }} />}
                    {primaryNavigationItems}
                </Box>

                <Box sx={{ ...styles.hideOnMobile, gap: 1 }}>
                    {selectionMenuItems}
                    {secondaryNavigationItems}
                </Box>
            </Toolbar>
        </AppBar>
    );
};
