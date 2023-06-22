// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, DropdownMenu, DropdownMenuProps } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(DropdownMenu);

const menuItems: DropdownMenuProps['menuItems'] = [
    {
        label: 'default',
        icon: 'CheckRounded',
        overrides: {
            selected: window.location.href.includes('default'),
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

metadata.title = 'Dropdown Menu';

metadata.args = {
    label: 'More options',
    menuItems,
    iconDropdown: false,
};

export default metadata;

export const Default = createStory();

export const IconDropdown = createStory({
    iconDropdown: true,
});
