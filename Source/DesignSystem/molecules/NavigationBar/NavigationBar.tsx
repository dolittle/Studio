// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, List, Toolbar } from '@mui/material';

import { IconButton, Icon } from '@dolittle/design-system';

import { NavigationBarMobile } from './NavigationBarMobile';

const responsiveStyles = {
    display: { xs: 'none', md: 'flex' }
};

/**
 * The props for a {@link NavigationBar} component.
 */
type NavigationBarProps = {
    /**
     * The main links that will be displayed in the navigation bar.
     * @default undefined
     */
    mainLinks?: JSX.Element;

    /**
     * The secondary links that will be displayed in the navigation bar.
     * @default undefined
     */
    secondaryLinks?: JSX.Element;

    /**
     * A mobile drop-down menu that appears in the bottom navigation bar next to the menu-toggle icon.
     * @default undefined
     */
    mobileDropdownMenu?: JSX.Element;

    /**
     * Secondary links that appear at the bottom of the mobile navigation bar.
     * @default undefined
     */
    mobileSecondaryLinks?: JSX.Element;
};

/**
 * The navigation bar is the top bar that contains the main navigation links and the secondary links.
 * @param {NavigationBarProps} props - The {@link NavigationBarProps} that contains the properties for the main top navigation bar.
 * @returns A {@link NavigationBar} component.
 */
export const NavigationBar = ({ mainLinks, secondaryLinks, mobileDropdownMenu, mobileSecondaryLinks }: NavigationBarProps) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const toggleMobileNav = () => setIsMobileNavOpen(prevState => !prevState);

    return (
        <AppBar component='nav' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            {isMobileNavOpen &&
                <NavigationBarMobile
                    isOpen={isMobileNavOpen}
                    setIsOpen={toggleMobileNav}
                    mobileMainLinks={mainLinks}
                    mobileSecondaryLinks={mobileSecondaryLinks}
                />
            }

            <Toolbar>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, width: 1, justifyContent: 'space-between' }}>
                    <IconButton
                        tooltipText='Toggle navigation menu'
                        icon='MenuRounded'
                        edge='start'
                        onClick={toggleMobileNav}
                    />

                    {mobileDropdownMenu}
                </Box>

                <Box sx={{ ...responsiveStyles, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                        <Icon icon='Dolittle' />
                    </Box>

                    <List sx={{ display: 'flex', gap: 2 }}>
                        {mainLinks}
                    </List>
                </Box>

                <List sx={{ ...responsiveStyles, gap: 2 }}>
                    {secondaryLinks}
                </List>
            </Toolbar>
        </AppBar>
    );
};
