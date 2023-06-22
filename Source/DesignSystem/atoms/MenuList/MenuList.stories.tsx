// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, MenuList } from '@dolittle/design-system';

import { menuItems } from '../../helpers/DummyContents/DummyNavigationItems';

const { metadata, createStory } = componentStories(MenuList);

metadata.args = {
    menuListItem: menuItems,
};

export default metadata;

export const Default = createStory();

//export const WithCheckbox = createStory();
