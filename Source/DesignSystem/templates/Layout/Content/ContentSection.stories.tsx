// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, ContentContainer, ContentHeader, ContentSection, MaxWidthTextBlock, Switch } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(ContentSection, {
    decorator: (story) => <ContentContainer>
        <ContentHeader title='Content Section'/>
        {story()}
        </ContentContainer>,
});

const DummyChildrenContent = () =>
    <MaxWidthTextBlock>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo similique consequuntur dolores natus ex
        sunt esse mollitia id atque. Atque molestiae cum magnam eligendi maxime id sapiente quaerat suscipit?
    </MaxWidthTextBlock>;

metadata.args = {
    title: 'Title',
    children: <DummyChildrenContent />,
    sx: { my: 2.125 },
    headerProps: {
        buttons: [
            { label: 'Button 1', variant: 'text', color: 'primary' },
            { label: 'Button 2', variant: 'text', color: 'secondary' },
            { label: 'Button 2', variant: 'text', color: 'subtle' },
        ]
    },
};

export default metadata;

export const Default = createStory();
