// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { ButtonTypeMap, ExtendButtonBase, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import { Button, Icon, IconProps, IconButton } from '../../index';

export type MenuItemProps = {
    /**
     * The id of the menu item.
     */
    id: string;

    /**
     * The label to display for the menu item.
     */
    label: string;

    /**
     * The icon to display for the menu item.
     *
     * Must be a valid {@link IconProps['icon']} value.
     */
    icon?: IconProps['icon'];

    /**
     * The callback function to call when a menu item is selected.
     * @param {any} item - The selected menu item.
     */
    onSelect?: (menuItem: MenuItemProps) => void;

    /**
     * The overrides prop gives you access to the underlying MuiButtonProps object, overriding the styles defined by the component and Material-UI.
     */
    overrides?: Partial<ExtendButtonBase<ButtonTypeMap>>;
};

/**
 * The props for a {@link DropdownMenu} component.
 */
export type DropdownMenuProps = {
    /**
     * The id of the dropdown menu.
     */
    id: string;

    /**
     * The menu items to display in the dropdown menu.
     */
    menuItems: MenuItemProps[];

    /**
     * Whether or not the dropdown menu is displayed as an icon button.
     * @default false
     */
    iconDropdown?: boolean;

    /**
     * The selected menu item label.
     * @default 'Menu'
     */
    selected?: string;

    /**
     * Whether or not to display icons for the menu items.
     * @default false
     */
    withIcons?: boolean;
};

/**
 * DropdownMenu is a component that displays a dropdown menu with a list of menu items.
 * @param {DropdownMenuProps} props - The {@link DropdownMenuProps}.
 * @returns A {@link DropdownMenu} component.
 */
export const DropdownMenu = ({ id, menuItems, iconDropdown, selected, withIcons }: DropdownMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItemLabel, setSelectedItemLabel] = useState('');

    const open = Boolean(anchorEl);

    useEffect(() => {
        setSelectedItemLabel(selected ? selected : 'Menu');
    }, [selected]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            {iconDropdown ?
                <IconButton
                    tooltipText='More options'
                    icon='MoreVertRounded'
                    edge='end'
                    onClick={handleMenuClick}
                    aria-haspopup='true'
                    aria-controls={open ? id : undefined}
                    aria-expanded={open ? 'true' : undefined}
                /> :
                <Button
                    label={selectedItemLabel}
                    color='subtle'
                    endWithIcon={open ? 'ArrowDropUpRounded' : 'ArrowDropDownRounded'}
                    onClick={handleMenuClick}
                    aria-haspopup='true'
                    aria-controls={open ? id : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    sx={{ '& .MuiButton-endIcon .MuiSvgIcon-root': { fontSize: 24 } }}
                />
            }

            <Menu
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {menuItems.map(menuItem => {
                    const menuItemIcon = selected && menuItem.label === selectedItemLabel ? 'CheckRounded' : menuItem.icon ? menuItem.icon : undefined;

                    return (
                        <MenuItem
                            key={menuItem.id}
                            dense
                            selected={selected ? menuItem.label === selectedItemLabel : false}
                            onClick={() => menuItem.onSelect?.(menuItem)}
                            {...menuItem.overrides}
                        >
                            {withIcons &&
                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                    {menuItemIcon && <Icon icon={menuItemIcon} />}
                                </ListItemIcon>
                            }

                            <ListItemText>
                                {menuItem.label}
                            </ListItemText>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};
