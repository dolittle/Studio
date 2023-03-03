// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { Dolittle } from '../../theming/Icons/CustomIcons';

type NavigationBarMobileProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const NavigationBarMobile = ({ isOpen, setIsOpen }: NavigationBarMobileProps) => {
    return (
        <Box component='nav'>
            <Drawer
                variant='temporary'
                open={isOpen}
                onClose={setIsOpen}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', sm: 'none' } }}
            >
                <List>
                    <ListItem sx={{ py: 2 }}>
                        <ListItemIcon sx={{ color: 'text.primary' }}>
                            <Dolittle />
                        </ListItemIcon>
                    </ListItem>

                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton dense>
                            {/* <ListItemIcon sx={{ color: 'text.primary' }}>
                                <Dolittle />
                            </ListItemIcon> */}
                            <ListItemText primary='TODO' primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton dense>
                            {/* <ListItemIcon sx={{ color: 'text.primary' }}>
                                <Dolittle />
                            </ListItemIcon> */}
                            <ListItemText primary='TODO' primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton dense>
                            {/* <ListItemIcon sx={{ color: 'text.primary' }}>
                                <Dolittle />
                            </ListItemIcon> */}
                            <ListItemText primary='TODO' primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <List>
                    {/*     <DropdownMenu />

                    <LinksList /> */}
                </List>

            </Drawer>
        </Box>
    );
};
