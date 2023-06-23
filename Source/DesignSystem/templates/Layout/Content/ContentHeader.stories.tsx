// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, ContentContainer, ContentHeader, Switch } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(ContentHeader, {
    decorator: story =>
        <ContentContainer>
            {story()}
        </ContentContainer>,
});

metadata.args = {
    title: 'Title',
    buttons: [
        { label: 'Button 1', variant: 'text', color: 'primary' },
        { label: 'Button 2', variant: 'text', color: 'secondary' },
        { label: 'Button 2', variant: 'text', color: 'subtle' },
    ],
};

export default metadata;

export const Default = createStory();

export const Subtitle = createStory({
    titleTextVariant: 'subtitle',
});

export const WithToolbar = createStory({
    buttonsSlot: <Switch.UI id='switch' label='Switch' value={true} />
});
