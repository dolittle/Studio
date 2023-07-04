// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories, List } from '../../index';

const { metadata, createStory } = componentStories(List);

metadata.title = 'List Items';

metadata.argTypes = {
    sx: { control: false },
};

metadata.args = {
    listItems: [
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
            icon: 'HelpRounded',
            onClick: action('Item 3 clicked'),
        },
    ],
    withIcons: false,
    dense: false,
    sx: { maxWidth: 150 },
};

export default metadata;

export const Default = createStory();

export const withIcons = createStory({
    withIcons: true,
});

export const dense = createStory({
    withIcons: true,
    dense: true,
});

// export const WithCheckbox = createStory();
// export const WithOverrides = createStory();
