// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories } from '../../componentStories';

import { Chip } from './Chip';

const { metadata, createStory } = componentStories(Chip);

metadata.parameters = {
    docs: {
        description: {
            component: ``
        },
    },
};

metadata.argTypes = {
    onDelete: { control: false },
    sx: { control: false },
};

metadata.args = {
    label: 'Default',
    onDelete: action('deleted'),
};

export default metadata;

export const Default = createStory();
