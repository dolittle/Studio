// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';

import { componentStories, DropdownMenu, DropdownMenuProps } from '../../index';

const { metadata, createStory } = componentStories(DropdownMenu);

const items: DropdownMenuProps['menuItems'] = [
    {
        id: '1',
        label: 'Item 1',
        onMenuItemSelect: action('Clicked Item 1'),
    },
    {
        id: '2',
        label: 'Item 2',
        onMenuItemSelect: action('Clicked Item 2'),
    },
    {
        id: '3',
        label: 'Item 3',
        icon: 'AigonixLightCube',
        onMenuItemSelect: action('Clicked Item 3'),
    },
];

metadata.title = 'Dropdown Menu';

metadata.args = {
    id: 'default-dropdown-menu',
    menuItems: items,
    iconDropdown: false,
    selected: '',
};

export default metadata;

export const Default = createStory();

export const IconDropdownMenu = createStory({
    iconDropdown: true,
});

export const WithSelection = () => {
    const [selected, setSelected] = useState('Item 1');

    return (
        <DropdownMenu
            id='selected-dropdown-menu'
            menuItems={items.map(item => ({ ...item, onMenuItemSelect: () => setSelected(item.label) }))}
            selected={selected}
        />
    );
};
