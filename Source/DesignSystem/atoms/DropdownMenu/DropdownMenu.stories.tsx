// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, DropdownMenu } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(DropdownMenu);

import { menuItems } from '../../helpers/DummyContents/DummyNavigationItems';

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
