// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

type RouterLinkListItemProps = {
    icon?: React.ReactElement;
    linkText: string;
    to: string;
};

// TUTORIAL: https://mui.com/material-ui/guides/composition/
const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

export const RouterLinkListItem = ({ icon, linkText, to }: RouterLinkListItemProps) =>
    <ListItem disablePadding>
        <ListItemButton component={Link} to={to} dense>
            {icon ?
                <ListItemIcon sx={{ color: 'text.primary' }}>{icon}</ListItemIcon> :
                null
            }
            {icon ?
                <ListItemText primary={linkText} primaryTypographyProps={{ variant: 'body2' }} /> :
                <ListItemText inset primary={linkText} primaryTypographyProps={{ variant: 'body2' }} />
            }
        </ListItemButton>
    </ListItem>;
