// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, List, Toolbar } from '@mui/material';

import { IconButton, Icon } from '@dolittle/design-system';

import { NavigationBarMobile } from './NavigationBarMobile';

const linkStyles = {
    'display': { xs: 'none', md: 'flex' },
    '.MuiListItemButton-root.Mui-selected': {
        color: 'primary.main',
        backgroundColor: 'transparent',
    },
};

/**
 * The props for a {@link NavigationBar} component.
 */
export type NavigationBarProps = {
    /**
     * Primary links that appear to the left of the navigation bar.
     */
    mainLinks?: JSX.Element;

    /**
     * More options drop-down menu that appears to the right of the navigation bar.
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
 * The navigation bar displays information and actions relating to the current screen.
 * @param {NavigationBarProps} props - The {@link NavigationBarProps}.
 * @returns A {@link NavigationBar} component.
 */
export const NavigationBar = ({ mainLinks, secondaryLinks, mobileDropdownMenu, mobileSecondaryLinks }: NavigationBarProps) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <AppBar component='nav' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            {isMobileNavOpen &&
                <NavigationBarMobile
                    isOpen={isMobileNavOpen}
                    onClose={() => setIsMobileNavOpen(false)}
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
                        onClick={() => setIsMobileNavOpen(prevState => !prevState)}
                    />

                    {mobileDropdownMenu}
                </Box>

                <Box sx={{ ...linkStyles, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                        <Icon icon='AigonixLightCube' />
                    </Box>

                    <List sx={{ display: 'flex', gap: 2 }}>
                        {mainLinks}
                    </List>
                </Box>

                <List sx={{ ...linkStyles, gap: 2 }}>
                    {secondaryLinks}
                </List>
            </Toolbar>
        </AppBar>
    );
};
