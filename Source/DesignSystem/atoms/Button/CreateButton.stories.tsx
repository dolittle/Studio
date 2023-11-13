// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories, CreateButton } from '../../index';

const { metadata, createStory } = componentStories(CreateButton);

metadata.title = 'Button/Create Button';

metadata.parameters = {
    docs: {
        description: {
            component: `The create button is a button that is used for creating new items.`
        },
    },
};

metadata.args = {
    label: 'Create button label',
    icon: 'RocketLaunch',
    isDisabled: false,
    onCreate: action('Button clicked!'),
};

export default metadata;

export const Default = createStory();
