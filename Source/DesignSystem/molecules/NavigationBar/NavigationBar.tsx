// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, List, Toolbar } from '@mui/material';

import { IconButton, Icon } from '@dolittle/design-system';

import { RouterLinkListItem } from './RouterLinkListItem';
import { SpaceSelectionMenu } from './SpaceSelectionMenu';
import { MoreOptionsMenu } from './MoreOptionsMenu';
import { NavigationBarMobile } from './NavigationBarMobile';

const responsiveStyles = {
    display: {
        xs: 'none',
        md: 'flex',
    },
};

export const NavigationBar = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const toggleMobileNav = () => setIsMobileNavOpen(prevState => !prevState);

    return (
        <AppBar component='nav' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            {isMobileNavOpen && <NavigationBarMobile isOpen={isMobileNavOpen} setIsOpen={toggleMobileNav} />}

            <Toolbar>
                <IconButton
                    tooltipText='Toggle navigation menu'
                    icon='MenuRounded'
                    edge='start'
                    onClick={toggleMobileNav}
                    sx={{ display: { md: 'none' } }}
                />

                <Box sx={{ ...responsiveStyles, flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                        <Icon icon='Dolittle' />
                    </Box>

                    <List sx={{ display: 'flex', gap: 2 }}>
                        <RouterLinkListItem to='' text='home' variantButton />
                        <RouterLinkListItem to='' text='solutions' variantButton />
                        <RouterLinkListItem to='' text='integrations' selected variantButton />
                    </List>
                </Box>

                <List sx={{ ...responsiveStyles, gap: 2 }}>
                    <SpaceSelectionMenu />
                    <MoreOptionsMenu />
                </List>
            </Toolbar>
        </AppBar>
    );
};
