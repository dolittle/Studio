// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material';
import { NavigationMenuItem } from './NavigationMenuItem';


export type NavigationListItemProps = {
    navigationMenuItem: NavigationMenuItem;
    selected?: boolean;
    onClick?: (navigationItem: NavigationMenuItem) => void
    sxOverride?: SxProps;
};

export const NavigationListItem = ({
    navigationMenuItem,
    selected = false,
    onClick,
    sxOverride
}: NavigationListItemProps) => {
    const defaultSxProps: SxProps = {
    };
    return (
        <ListItem
            disablePadding
        >
            <ListItemButton
                disabled={navigationMenuItem.disabled}
                href={navigationMenuItem.href}
                selected={selected}
                onClick={onClick ? (event) => {
                    event?.preventDefault();
                    onClick(navigationMenuItem);
                } : undefined}
                sx={{ ...defaultSxProps, ...sxOverride }}
            >
                <ListItemIcon
                    sx={{
                        color: (theme: Theme) => theme.palette.text.secondary
                    }}
                >
                    {navigationMenuItem.icon}
                </ListItemIcon>
                <ListItemText>
                    {navigationMenuItem.name}
                </ListItemText>
            </ListItemButton>
        </ListItem>
    );

};
