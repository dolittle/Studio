// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Button, SimpleCard } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(SimpleCard);

metadata.title = 'Simple Card';

metadata.parameters = {
    docs: {
        description: {
            component: 'A simple card with a title, subtitle, description and actions.',
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
            story: 'A card with a subtitle.',
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
