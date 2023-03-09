// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, SelectCard } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(SelectCard);

metadata.title = 'Select Card';

metadata.args = {
    icon: 'Dolittle',
    title: 'Title',
    description: 'This is a description for the select card.',
    listTitle: 'List title',
    listItems: ['List item 1', 'List item 2', 'List item 3', 'List item 4'],
    footerTitle: 'Footer title',
    footerText: 'This is a footer text',
};

export default metadata;

export const Default = createStory();
