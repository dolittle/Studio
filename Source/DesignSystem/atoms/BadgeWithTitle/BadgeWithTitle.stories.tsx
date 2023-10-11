// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '../../index';

import { BadgeWithTitle } from './BadgeWithTitle';

const { metadata, createStory } = componentStories(BadgeWithTitle);

metadata.parameters = {
    docs: {
        description: {
            component: ``
        },
    },
};

metadata.args = {
    number: 1,
    title: 'Default Badge with Title',
};

export default metadata;

export const Default = createStory();
