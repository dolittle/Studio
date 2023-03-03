// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { AppBar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';

import { IconButton } from '@dolittle/design-system';
import { Dolittle } from '../../theming/Icons/CustomIcons';

import { SpaceSelectionMenu } from './SpaceSelectionMenu';
import { MoreOptionsMenu } from './MoreOptionsMenu';
import { NavigationBarMobile } from './NavigationBarMobile';

export const NavigationBar = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const handleMobileNavIsOpen = () => setIsMobileNavOpen(prevState => !prevState);

    return (
        <AppBar component='nav'>
            {isMobileNavOpen && <NavigationBarMobile isOpen={isMobileNavOpen} setIsOpen={handleMobileNavIsOpen} />}

            <Toolbar>
                <IconButton
                    icon='MenuRounded'
                    edge='start'
                    onClick={handleMobileNavIsOpen}
                    sx={{ display: { sm: 'none' } }}
                />

                <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1 }}>
                    <List sx={{ display: 'inline-flex', gap: 2 }}>
                        <ListItem disablePadding>
                            <ListItemIcon sx={{ color: 'text.primary' }}>
                                <Dolittle />
                            </ListItemIcon>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary='home' primaryTypographyProps={{ variant: 'button' }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary='solutions' primaryTypographyProps={{ variant: 'button' }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary='integrations' primaryTypographyProps={{ variant: 'button', color: 'primary' }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>

                <List sx={{ gap: 2, display: { xs: 'none', sm: 'flex' } }}>
                    <SpaceSelectionMenu />
                    <MoreOptionsMenu />
                </List>
            </Toolbar>
        </AppBar>
    );
};
