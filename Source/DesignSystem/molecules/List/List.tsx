// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ButtonTypeMap, ExtendButtonBase, List as MuiList, ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps } from '@mui/material';

import { Icon, IconProps } from '../../index';

type ListItemProps = {
    /**
     * The label to display for the list item.
     */
    label?: string;

    /**
     * The icon to display for the list item.
     *
     * Must be a valid {@link IconProps['icon']} value.
     */
    icon?: IconProps['icon'];

    /**
     * The callback function to call when a list item is selected.
     * @param {any} item - The selected list item.
     */
    onClick?: () => void;

    /**
     * The overrides prop gives you access to the underlying MuiButtonProps object, overriding the styles defined by the component and Material-UI.
     */
    overrides?: Partial<ExtendButtonBase<ButtonTypeMap>>;
};

/**
 * The props for a {@link List} component.
 */
export type ListProps = {
    /**
     * The list items to display.
     */
    listItems: ListItemProps[];

    /**
     * Whether or not the list item should display an icon.
     * @default false
     */
    withIcons?: boolean;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

// TODO: Add support for checkboxes.

/**
 * List is a component that displays a list of items.
 * @param {ListProps} props - The {@link ListProps}.
 * @returns A {@link List} component.
 */
export const List = ({ listItems, withIcons, sx }: ListProps) =>
    <MuiList component='nav' sx={{ maxWidth: 320, ...sx }}>
        {listItems.map(item =>
            <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={item.onClick} dense sx={{ whiteSpace: 'nowrap' }} {...item.overrides}>
                    {withIcons &&
                        <ListItemIcon sx={{ color: 'text.primary' }}>
                            {item.icon && <Icon icon={item.icon} />}
                        </ListItemIcon>
                    }
                    <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItemButton>
            </ListItem>
        )}
    </MuiList>;
