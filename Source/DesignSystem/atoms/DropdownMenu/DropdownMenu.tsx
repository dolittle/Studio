// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { ButtonTypeMap, ExtendButtonBase, Menu, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import { Button, Icon, IconProps, IconButton } from '@dolittle/design-system';

type MenuItemProps = {
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
 * The props for a {@link DropdownMenu} component.
 */
export type DropdownMenuProps = {
    /**
     * The text to display for the dropdown menu.
     */
    label: string;

    /**
     * Whether or not the dropdown menu is an icon dropdown.
     * @default false
     */
    iconDropdown?: boolean;

    /**
     * The menu items to display in the dropdown menu.
     */
    menuItems: MenuItemProps[];
};

/**
 * DropdownMenu is a component that displays a dropdown menu with a list of menu items.
 * @param {DropdownMenuProps} props - The {@link DropdownMenuProps}.
 * @returns A {@link DropdownMenu} component.
 */
export const DropdownMenu = ({ label, menuItems, iconDropdown }: DropdownMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            {iconDropdown ?
                <IconButton
                    tooltipText={label}
                    icon='MoreVertRounded'
                    edge='end'
                    onClick={e => setAnchorEl(e.currentTarget)}
                    aria-controls={open ? 'more-options' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                /> :
                <Button
                    label={label}
                    color='subtle'
                    endWithIcon={open ? 'ArrowDropUpRounded' : 'ArrowDropDownRounded'}
                    onClick={e => setAnchorEl(e.currentTarget)}
                    aria-haspopup='true'
                    aria-controls={open ? 'select-selected' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                />
            }

            <Menu
                id={label.replace(' ', '-').toLowerCase()}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                //MenuListProps={{ 'aria-labelledby': 'select-selected' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {menuItems.map(item =>
                    <li key={item.label}>
                        <ListItemButton dense onClick={item.onClick} {...item.overrides}>
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                {item.icon && <Icon icon={item.icon} />}
                            </ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                        </ListItemButton>
                    </li>
                )}
            </Menu>
        </>
    );
};
