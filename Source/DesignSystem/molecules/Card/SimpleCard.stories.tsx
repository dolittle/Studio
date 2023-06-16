// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { action } from '@storybook/addon-actions';

import { Grid } from '@mui/material';

import { componentStories, Button, SimpleCard } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(SimpleCard);

const dummyData = [
    {
        id: '1',
        title: 'Title 1',
        description: 'Here is a description of the card.',
    },
    {
        id: '2',
        title: 'Title 2',
        subtitle: 'This is with a subtitle',
        description: 'Here is a description of the card. It can be a bit longer than the title, but not too long.',
    },
    {
        id: '3',
        title: 'Title 3',
        description: 'Here is a description of the card.',
    },
];

const ActionButtons = () =>
    <>
        <Button label='Secondary button' color='subtle' onClick={action('clicked')} />
        <Button label='Primary button' onClick={action('clicked')} />
    </>;

metadata.title = 'Card/Simple Card';

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

metadata.argTypes = {
    actionButtons: {
        control: false,
        description: 'The actions of the card. Use `Button` or `IconButton` component for that.',
    },
};

metadata.args = {
    title: 'Card Title',
    subtitle: '',
    description: 'Here is a description of the card. It can be a bit longer than the title, but not too long.',
    actionButtons: <ActionButtons />,
    actionButtonsAlignment: 'left',
};

export default metadata;

export const Default = createStory();

export const WithSubtitle = createStory({
    subtitle: 'This is a subtitle',
});
WithSubtitle.parameters = {
    docs: {
        description: {
            story: `A card can contain an optional subtitle. Subtitles are a great way to add metadata such as
            location tags, authors or dates. They can also be used to convey additional information about the card details.
            Card subtitles should display in the secondary color.`,
        },
    },
};

export const RightAlignedButton = createStory({
    actionButtonsAlignment: 'right',
});
RightAlignedButton.parameters = {
    docs: {
        description: {
            story: 'A card with a right aligned button.',
        },
    },
};

export const UseInGrid = () =>
    <Grid container spacing={4} sx={{ maxWidth: 950 }}>
        {dummyData.map(item =>
            <Grid key={item.id} item xs={12} md={6}>
                <SimpleCard
                    title={item.title}
                    subtitle={item.subtitle}
                    description={item.description}
                    actionButtons={<ActionButtons />}
                />
            </Grid>
        )}
    </Grid>;
UseInGrid.parameters = {
    docs: {
        description: {
            story: `A card can be used in a grid. The grid should have a maximum width of 950px.
            The cards should be placed in a grid with a spacing of 4.
            Grid items should have a width of 12 on mobile and 6 on tablet and above.`,
        },
    },
};
