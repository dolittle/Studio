// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, Toolbar, Theme } from '@mui/material';

import { Button, ButtonProps, DropdownMenu, DropdownMenuProps, Icon, IconProps, IconButton } from '@dolittle/design-system';

import { NavigationBarMobile } from './NavigationBarMobile';

const styles = {
    nav: { zIndex: (theme: Theme) => theme.zIndex.drawer + 1 },
    hideOnMobile: { display: { xs: 'none', md: 'flex' } },
    mobileMenu: {
        width: 1,
        justifyContent: 'space-between',
        display: { xs: 'flex', md: 'none' },
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
    primaryNavigationItems?: ButtonProps[];

    /**
     * Secondary links that appear to the right of the navigation bar.
     */
    secondaryNavigationItems?: DropdownMenuProps['menuItems'];

    /**
     * A drop-down menu that appears in the right of the navigation bar.
     */
    selectionMenuItems?: DropdownMenuProps['menuItems'];
};

/**
 * The navigation bar displays information and actions relating to the current screen.
 * @param {NavigationBarProps} props - The {@link NavigationBarProps}.
 * @returns A {@link NavigationBar} component.
 */
export const NavigationBar = ({ logo, primaryNavigationItems, secondaryNavigationItems, selectionMenuItems }: NavigationBarProps) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <AppBar elevation={4} component='nav' sx={styles.nav}>
            {isMobileNavOpen &&
                <NavigationBarMobile
                    isOpen={isMobileNavOpen}
                    onClose={() => setIsMobileNavOpen(false)}
                    logo={logo}
                    mainLinks={primaryNavigationItems}
                    secondaryLinks={secondaryNavigationItems}
                />
            }

            <Toolbar>
                <Box sx={styles.mobileMenu}>
                    <IconButton
                        tooltipText='Toggle navigation menu'
                        icon='MenuRounded'
                        edge='start'
                        onClick={() => setIsMobileNavOpen(prevState => !prevState)}
                    />

                    {selectionMenuItems &&
                        <DropdownMenu label='Selection menu' menuItems={selectionMenuItems} />
                    }
                </Box>

                <Box sx={{ ...styles.hideOnMobile, flexGrow: 1, alignItems: 'center', gap: 3 }}>
                    {logo && <Icon icon={logo} sx={{ mr: 2 }} />}

                    {primaryNavigationItems?.map(navigationItem =>
                        <Button
                            key={navigationItem.label}
                            {...navigationItem}
                            sx={{ color: window.location.href.includes(navigationItem.label) ? 'primary.main' : 'text.primary' }}
                        />
                    )}
                </Box>

                <Box sx={{ ...styles.hideOnMobile, gap: 1 }}>
                    {selectionMenuItems &&
                        <DropdownMenu label='Selection menu' menuItems={selectionMenuItems} />
                    }

                    {secondaryNavigationItems &&
                        <DropdownMenu label='More options' menuItems={secondaryNavigationItems} iconDropdown />
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};
