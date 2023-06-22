// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, MenuList, MenuListProps } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(MenuList);

const menuItems: MenuListProps['menuListItem'] = [
    {
        label: 'Selected',
        icon: 'CheckRounded',
        overrides: {
            selected: true,
        },
    },
    {
        label: 'Link 2',
    },
    {
        label: 'Link 3',
        icon: 'LogoutRounded',
    },
];

metadata.args = {
    menuListItem: menuItems,
};

export default metadata;

export const Default = createStory();

//export const WithCheckbox = createStory();
