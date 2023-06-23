// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ButtonTypeMap, ExtendButtonBase, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { Icon, IconProps } from '@dolittle/design-system';

type MenuListItemProps = {
    /**
     * The label to display for the menu item.
     */
    label: string;

    /**
     * The icon to display for the menu item.
     */
    icon?: IconProps['icon'];

    /**
     * The onClick handler for the menu item.
     */
    onClick?: () => void;

    /**
     * The overrides prop gives you access to the underlying MuiButtonProps object, overriding the styles defined by the component and Material-UI.
     */
    overrides?: Partial<ExtendButtonBase<ButtonTypeMap>>;
};

/**
 * The props for a {@link MenuListProps} component.
 */
export type MenuListProps = {
    menuListItem: MenuListItemProps[];
};

// TODO: If none of the menu items have an icon then there will be weird spacing.

/**
 * MenuList is a component that displays a list of menu items.
 * @param {MenuListProps} props - The {@link MenuListProps}.
 * @returns A {@link MenuList} component.
 */
export const MenuList = ({ menuListItem }: MenuListProps) =>
    <List component='nav' sx={{ maxWidth: 320 }}>
        {menuListItem.map(item =>
            <ListItemButton key={item.label} dense onClick={item.onClick} {...item.overrides}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon && <Icon icon={item.icon} />}
                </ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
            </ListItemButton>
        )}
    </List>;
