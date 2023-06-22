// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Menu } from '@mui/material';

import { Button, IconButton, MenuList, MenuListProps } from '@dolittle/design-system';

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
    menuItems: MenuListProps['menuListItem'];
};

/**
 * DropdownMenu is a component that displays a dropdown menu with a list of menu items.
 * @param {DropdownMenuProps} props - The {@link DropdownMenuProps}.
 * @returns A {@link DropdownMenu} component.
 */
export const DropdownMenu = ({ label, menuItems, iconDropdown }: DropdownMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            {iconDropdown ?
                <IconButton
                    tooltipText={label}
                    icon='MoreVertRounded'
                    edge='end'
                    onClick={handleClickListItem}
                    aria-controls={open ? 'more-options' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                /> :
                <Button
                    label={label}
                    color='subtle'
                    endWithIcon={open ? 'ArrowDropUpRounded' : 'ArrowDropDownRounded'}
                    onClick={handleClickListItem}
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
                <MenuList menuListItem={menuItems} />
            </Menu>
        </>
    );
};
