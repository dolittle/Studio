// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps } from '@mui/material';

const selectedStyles = {
    '.MuiListItemButton-root.Mui-selected': {
        color: 'primary.main',
        backgroundColor: 'transparent',
    },
};

type RouterLinkListItemProps = {
    to: string;
    icon?: React.ReactElement;
    text?: string;
    inset?: boolean;
    selected?: boolean;
    sx?: SxProps;
    variantButton?: boolean;
};

// TUTORIAL: https://mui.com/material-ui/guides/composition/
const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

export const RouterLinkListItem = ({ to, icon, text, inset, selected, sx, variantButton }: RouterLinkListItemProps) =>
    <ListItem disablePadding sx={{ ...selectedStyles, ...sx }}>
        <ListItemButton component={Link} to={to} selected={selected} dense>
            {icon ? <ListItemIcon sx={{ color: 'text.primary' }}>{icon}</ListItemIcon> : null}

            <ListItemText inset={inset} primary={text} primaryTypographyProps={{ variant: variantButton ? 'button' : 'body2' }} />
        </ListItemButton>
    </ListItem>;
