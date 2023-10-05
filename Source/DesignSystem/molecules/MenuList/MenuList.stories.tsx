// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories, MenuList, MenuListProps } from '../../index';

const { metadata, createStory } = componentStories(MenuList);

const items: MenuListProps['listItems'] = [
    {
        label: 'Item 1',
        icon: 'AddBoxRounded',
        onClick: action('Item 1 clicked'),
    },
    {
        label: 'Item 2',
        icon: 'CheckRounded',
        onClick: action('Item 2 clicked'),
    },
    {
        label: 'Item 3',
        icon: 'LogoutRounded',
        onClick: action('Item 3 clicked'),
    },
];

metadata.title = 'Menu List';

metadata.argTypes = {
    sx: { control: false },
};

metadata.args = {
    listItems: items,
    withSelectedItem: false,
    initialySelectedItem: 0,
    withIcons: false,
    dense: false,
    sx: { maxWidth: 150 },
};

export default metadata;

export const Default = createStory();

export const dense = createStory({
    dense: true,
});

export const withIcons = createStory({
    withIcons: true,
});

export const WithSelectedItem = createStory({
    withSelectedItem: true,
});

// export const WithCheckbox = createStory();
// export const WithOverrides = createStory();
