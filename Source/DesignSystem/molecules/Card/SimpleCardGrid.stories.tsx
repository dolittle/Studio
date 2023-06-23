// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories } from '@dolittle/design-system';

import { SimpleCardGrid, SimpleCardGridProps } from './SimpleCardGrid';

const { metadata, createStory } = componentStories(SimpleCardGrid);

const dummySimpleCardItems: SimpleCardGridProps['simpleCardItems'] = [
    {
        title: 'Default',
        description: 'Here is a description of the card.',
        primaryButton: {
            label: 'Primary button',
            onClick: action('Primary button clicked'),
        },
    },
    {
        title: 'With subtitle and secondary button',
        subtitle: 'This is with a subtitle',
        description: 'Here is a description of the card. It can be a bit longer than the title, but not too long.',
        primaryButton: {
            label: 'Primary button',
            onClick: action('Primary button clicked'),
        },
        secondaryButton: {
            label: 'Secondary button',
            onClick: action('Secondary button clicked'),
        },
    },
    {
        title: 'With right aligned buttons',
        description: 'Here is a description of the card.',
        primaryButton: {
            label: 'Primary button',
            onClick: action('Primary button clicked'),
        },
        secondaryButton: {
            label: 'Secondary button',
            onClick: action('Secondary button clicked'),
        },
        buttonAlignment: 'right',
    },
];

metadata.title = 'Card/Simple Card Grid';

metadata.parameters = {
    docs: {
        description: {
            component: `Simple cards are surfaces that display content and actions on a single topic.
They should be easy to scan for relevant and actionable information. Elements, such as text,
images and buttons should be placed on them in a way that clearly indicates their hierarchy.

A card can stand alone, without relying on surrounding elements for context. They are a great
way to visually organize various types of information or categories.`,
        },
    },
};

metadata.args = {
    simpleCardItems: dummySimpleCardItems,
};

export default metadata;

export const Default = createStory();
