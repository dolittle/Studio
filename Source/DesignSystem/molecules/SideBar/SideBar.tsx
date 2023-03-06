// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { styled, Theme, CSSObject } from '@mui/material/styles';

import { Box, Divider } from '@mui/material';
import { KeyboardDoubleArrowLeft } from '@mui/icons-material';

import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Button, IconButton, Icon } from '@dolittle/design-system';

import { RouterLinkListItem } from '../NavigationBar/RouterLinkListItem';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // Necessary for content to be below app bar.
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const SideBar = () => {
    const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

    return (
        <Drawer variant='permanent' open={isSideBarExpanded}>
            <Toolbar />

            <DrawerHeader>
                {isSideBarExpanded ?
                    <Button
                        label='Collapse'
                        color='subtle'
                        startWithIcon={<KeyboardDoubleArrowLeft />}
                        onClick={() => setIsSideBarExpanded(false)}
                    /> :
                    <IconButton
                        tooltipText='Open sidebar'
                        icon='KeyboardDoubleArrowRight'
                        onClick={() => setIsSideBarExpanded(true)}
                    />
                }
            </DrawerHeader>

            <Divider />

            <List>
                {/* <RouterLinkListItem to='' linkText='ERP Connections' icon={<Icon icon='PolylineRounded' />} /> */}

                {['ERP Connections', 'Bridge Designer'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={index === 1} sx={{ minHeight: 48, justifyContent: isSideBarExpanded ? 'initial' : 'center', px: 2.5 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: isSideBarExpanded ? 3 : 'auto', justifyContent: 'center', color: 'text.secondary' }}>
                                {index % 2 === 0 ? <Icon icon='PolylineRounded' /> : <Icon icon='Bridge' />}
                            </ListItemIcon>

                            <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={text} sx={{ opacity: isSideBarExpanded ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List>
                {['Microservices', 'Backups', 'Container Registry', 'Logs'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton sx={{ minHeight: 48, justifyContent: isSideBarExpanded ? 'initial' : 'center', px: 2.5 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: isSideBarExpanded ? 3 : 'auto', justifyContent: 'center', color: 'text.secondary' }}>
                                {index % 2 === 0 ? <Icon icon='AppsRounded' /> : <Icon icon='SettingsRounded' />}
                            </ListItemIcon>

                            <ListItemText primary={text} primaryTypographyProps={{ variant: 'body2' }} sx={{ opacity: isSideBarExpanded ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
