// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, Toolbar, Theme } from '@mui/material';

import { Button, Icon, IconProps } from '@dolittle/design-system';

import { NavigationBarMobile } from './NavigationBarMobile';

const styles = {
    nav: { zIndex: (theme: Theme) => theme.zIndex.drawer + 1 },
    hideOnMobile: { display: { xs: 'none', sm: 'flex' } },
    // mobileMenu: {
    //     width: 1,
    //     justifyContent: 'space-between',
    //     display: { xs: 'flex', md: 'none' },
    // },
    // 'display': { xs: 'none', md: 'flex' },
    // '.MuiListItemButton-root.Mui-selected': {
    //     color: 'primary.main',
    //     backgroundColor: 'transparent',
    // },
};

type PrimaryNavigationItemButtonProps = {
    href: string;
    name: string;
};

const PrimaryNavigationItemButton = ({ name, href }: PrimaryNavigationItemButtonProps) => {
    const selected = window.location.href.includes(href);

    return (
        <Button label={name} href={href} sx={{ color: selected ? 'primary.light' : 'text.primary' }} />
    );
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
    primaryNavigationItems?: PrimaryNavigationItemButtonProps[];

    /**
     * More options drop-down menu that appears to the right of the navigation bar.
     */
    optionsMenu?: JSX.Element;

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
 * The navigation bar displays information and actions relating to the current screen.
 * @param {NavigationBarProps} props - The {@link NavigationBarProps}.
 * @returns A {@link NavigationBar} component.
 */
export const NavigationBar = ({ logo, primaryNavigationItems, optionsMenu, mobileDropdownMenu, mobileSecondaryLinks }: NavigationBarProps) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <AppBar elevation={4} component='nav' sx={styles.nav}>
            {/* {isMobileNavOpen &&
                <NavigationBarMobile
                    isOpen={isMobileNavOpen}
                    onClose={() => setIsMobileNavOpen(false)}
                    mobileMainLinks={primaryLinks}
                    mobileSecondaryLinks={mobileSecondaryLinks}
                />
            } */}

            <Toolbar>
                {/* <IconButton
                    tooltipText='Toggle navigation menu'
                    icon='MenuRounded'
                    edge='start'
                    onClick={() => setIsMobileNavOpen(prevState => !prevState)}
                /> */}

                {/* {mobileDropdownMenu} */}

                <Box sx={{ ...styles.hideOnMobile, flexGrow: 1, alignItems: 'center', gap: 3 }}>
                    {logo && <Icon icon={logo} />}

                    {primaryNavigationItems?.map(navigationItem =>
                        <PrimaryNavigationItemButton key={navigationItem.name} {...navigationItem} />
                    )}
                </Box>

                <Box sx={{ ...styles.hideOnMobile }}>
                    {optionsMenu}
                </Box>
            </Toolbar>
        </AppBar>
    );
};
