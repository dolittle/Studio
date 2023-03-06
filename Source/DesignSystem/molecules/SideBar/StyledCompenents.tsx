// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { styled, Theme, CSSObject } from '@mui/material/styles';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MuiDrawer from '@mui/material/Drawer';

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

type CustomListItemProps = {
    icon: React.ReactElement;
    text: string;
    expanded: boolean;
    onClick?: () => void;
};

export const CustomListItem = ({ icon, text, expanded, onClick }: CustomListItemProps) =>
    <ListItem disablePadding>
        <ListItemButton onClick={onClick} sx={{ justifyContent: expanded ? 'initial' : 'center' }}>
            <ListItemIcon sx={{ minWidth: 0, mr: expanded ? 3 : 'auto', justifyContent: 'center', color: 'text.primary' }}>
                {icon}
            </ListItemIcon>

            <ListItemText primary={text} sx={{ opacity: expanded ? 1 : 0 }} primaryTypographyProps={{ variant: 'body2' }} />
        </ListItemButton>
    </ListItem>;

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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
