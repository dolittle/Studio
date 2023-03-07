// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, List, Toolbar } from '@mui/material';

import { IconButton, Icon } from '@dolittle/design-system';

import { NavigationBarMobile } from './NavigationBarMobile';

const responsiveStyles = {
    display: { xs: 'none', md: 'flex' }
};

type NavigationBarProps = {
    mainLinks?: JSX.Element;
    moreOptions?: JSX.Element;
    mobileDropdownMenu?: JSX.Element;
    mobileSecondaryLinks?: JSX.Element;
};

export const NavigationBar = ({ mainLinks, moreOptions, mobileDropdownMenu, mobileSecondaryLinks }: NavigationBarProps) => {
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
                    {moreOptions}
                </List>
            </Toolbar>
        </AppBar>
    );
};
