// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Button, SimpleCard } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(SimpleCard);

metadata.title = 'Simple Card';

//TODO: Fix line breaking for component description. Unable to enter to new line without breaking the syntax.
metadata.parameters = {
    docs: {
        description: {
        component: 'Simple cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information. Elements, such as text, images and buttons should be placed on them in a way that clearly indicates their hierarchy. A card can stand alone, without relying on surrounding elements for context. They are a great way to visually organize various types of information or categories.',
        },
    },
};

metadata.argTypes = {
    actions: { control: false },
};

metadata.args = {
    title: 'Card Title',
    description: 'Here is a description of the card. It can be a bit longer than the title, but not too long.',
    actions: (
        <div>
            <Button label='Secondary button' color='subtle' href='#' target />
            <Button label='Primary button' />
        </div>
    ),
};

export default metadata;

export const Default = createStory();

export const WithSubtitle = createStory({
    subtitle: 'This is a subtitle',
});
WithSubtitle.parameters = {
    docs: {
        description: {
            story: 'A card can contain an optional subtitle. Subtitles are a great way to add metadata such as location tags, authors or dates. They can also be used to convey additional information about the card details. Card subtitles should display in the secondary color.',
        },
    },
};

export const RightAlignedButton = createStory({
    actions: <Button label='Right aligned button' />,
    actionsAlignment: 'right',
});
RightAlignedButton.parameters = {
    docs: {
        description: {
            story: 'A card with a right aligned button.',
        },
    },
};
