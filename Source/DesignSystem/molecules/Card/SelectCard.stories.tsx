// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, SelectCard } from '@dolittle/design-system';

import { action } from '@storybook/addon-actions';

const { metadata, createStory } = componentStories(SelectCard);

metadata.title = 'Card/Select Card';

metadata.parameters = {
    docs: {
        description: {
            component: `Selection cards are used when the user needs to select an option but needs additional information in order to make an informed decision. 
The card can expand when the user clicks the select button, displaying more information that would help the user decide how to proceed with the task at hand.

Cards are to be used as entry points to more complex scenarios. A common scenario for a selection card is when a decision fork needs to be made, such as at the start of a wizard. 
The card's UI changes based on its state: enabled, hovered, selected, disabled.

**Structure:** A selection card contains an icon at the top (optional), card header, body content, and button. The button should indicate when the the card has been selected. 
Clicking a selected card a second time should deselect the card. ` },
    },
};

metadata.args = {
    icon: 'Dolittle',
    title: 'Title',
    description: 'This is a description for the select card.',
    listTitle: 'List title',
    listItems: ['List item 1', 'List item 2', 'List item 3', 'List item 4'],
    footerTitle: 'Footer title',
    footerText: 'This is a footer text',
    onCardSelect: action('Card select'),
};

export default metadata;

export const Default = createStory();
