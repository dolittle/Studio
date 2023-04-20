// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, List, Toolbar } from '@mui/material';

import { IconButton, Icon } from '@dolittle/design-system';

import { NavigationBarResponsive } from './NavigationBarResponsive';

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
     * A responsive drop-down menu that appears in the bottom navigation bar next to the menu-toggle icon.
     * @default undefined
     */
    responsiveDropdownMenu?: JSX.Element;

    /**
     * Secondary links that appear at the bottom of the responsive navigation bar.
     * @default undefined
     */
    responsiveSecondaryLinks?: JSX.Element;
};

/**
 * The navigation bar is the top bar that contains the main navigation links and the secondary links.
 * @param {NavigationBarProps} props - The {@link NavigationBarProps} that contains the properties for the main top navigation bar.
 * @returns A {@link NavigationBar} component.
 */
export const NavigationBar = ({ mainLinks, secondaryLinks, responsiveDropdownMenu, responsiveSecondaryLinks }: NavigationBarProps) => {
    const [isResponsiveNavOpen, setIsResponsiveNavOpen] = useState(false);

    return (
        <AppBar component='nav' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            {isResponsiveNavOpen &&
                <NavigationBarResponsive
                    isOpen={isResponsiveNavOpen}
                    onClose={() => setIsResponsiveNavOpen(false)}
                    responsiveMainLinks={mainLinks}
                    responsiveSecondaryLinks={responsiveSecondaryLinks}
                />
            }

            <Toolbar>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, width: 1, justifyContent: 'space-between' }}>
                    <IconButton
                        tooltipText='Toggle navigation menu'
                        icon='MenuRounded'
                        edge='start'
                        onClick={() => setIsResponsiveNavOpen(prevState => !prevState)}
                    />

                    {responsiveDropdownMenu}
                </Box>

                <Box sx={{ ...linkStyles, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                        <Icon icon='Dolittle' />
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
