// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button, ButtonProps, DropdownMenu, DropdownMenuProps } from '../../index';

export type PrimaryNavigationItemsProps = ButtonProps & {
    label: string;
    href: string;
};

export const getPrimaryNavigationItems = (primaryNavigationItems: PrimaryNavigationItemsProps[]) =>
    <>
        {primaryNavigationItems.map(navigationItem =>
            <Button
                key={navigationItem.label}
                {...navigationItem}
                sx={{ color: window.location.href.includes(navigationItem.href) ? 'primary.main' : 'text.primary' }}
            />
        )}
    </>;

export const getSelectionMenuItems = (selectionMenuItems: DropdownMenuProps['menuItems'], selected: string) =>
    <DropdownMenu id='navigation-bar-select' menuItems={selectionMenuItems} selected={selected} />;

export const getSecondaryNavigationItems = (secondaryNavigationItems: DropdownMenuProps['menuItems']) =>
    <DropdownMenu id='more-options' menuItems={secondaryNavigationItems} iconDropdown />;
