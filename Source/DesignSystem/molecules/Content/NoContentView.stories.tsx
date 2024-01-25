// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories, NoContentView } from '../../index';

const { metadata, createStory } = componentStories(NoContentView);

metadata.title = 'Content/No Content View';

metadata.parameters = {
    docs: {
        description: {
            component: 'A component that displays an empty state with a title, description, and button with a large dashed border.'
        },
    },
};

metadata.args = {
    title: 'This is the title...',
    label: 'This is the label',
    description: 'This is the description.',
    subDescription: 'This is a sub-description that belongs to the description and is necessary.',
    onCreate: action('Button clicked!'),
};

export default metadata;

export const Default = createStory();
