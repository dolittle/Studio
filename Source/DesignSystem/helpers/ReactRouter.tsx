// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link as RouterLink, LinkProps as RouterLinkProps, MemoryRouter, useLocation } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import { ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps, Typography } from '@mui/material';

type RouterLinkListItemProps = {
    to: string;
    icon?: React.ReactElement;
    text?: string;
    inset?: boolean;
    selected?: boolean;
    sx?: SxProps;
    variantButton?: boolean;
};

export const Router = ({ children }: { children?: React.ReactNode }) => {
    if (typeof window === 'undefined') {
        return <StaticRouter location='/main3'>{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={['/main3']} initialIndex={0}>{children}</MemoryRouter>
    );
};

export const Content = () => {
    const location = useLocation();

    return (
        <Typography variant='body2' sx={{ pb: 2 }} color='text.secondary'>
            Current route: {location.pathname}
        </Typography>
    );
};

// TUTORIAL: https://mui.com/material-ui/guides/composition/
const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

export const RouterLinkListItem = ({ to, icon, text, inset, sx, variantButton }: RouterLinkListItemProps) => {
    const location = useLocation();

    return (
        <ListItem disablePadding sx={sx}>
            <ListItemButton component={Link} to={to} selected={location.pathname.includes(to)} dense>
                {icon ? <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon> : null}
                <ListItemText inset={inset} primary={text} primaryTypographyProps={{ variant: variantButton ? 'button' : 'body2' }} />
            </ListItemButton>
        </ListItem>
    );
};
//location.pathname.includes(to) ? 'primary.main' :
