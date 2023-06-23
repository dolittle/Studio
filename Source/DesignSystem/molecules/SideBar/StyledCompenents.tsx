// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Drawer as MuiDrawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

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
    onClick?: () => void;
};

export const CustomListItem = ({ icon, text, onClick }: CustomListItemProps) =>
    <ListItem disablePadding sx={{ minHeight: 64 }}>
        <ListItemButton onClick={onClick}>
            <ListItemIcon sx={{ color: 'text.primary' }}>
                {icon}
            </ListItemIcon>

            <ListItemText primary={text} primaryTypographyProps={{ variant: 'body2' }} />
        </ListItemButton>
    </ListItem>;

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
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
