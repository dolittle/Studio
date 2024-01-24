// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories, AigonHelperIcon } from '../../index';

const { metadata, createStory } = componentStories(AigonHelperIcon);

metadata.title = 'AIAssistant/Aigon Helper Icon';

metadata.parameters = {
    docs: {
        description: {
            component: 'Aigon Helper Icon is a component that can be used to turn on AI-assisted search.',
        },
    },
};

metadata.args = {
    onAigonActivate: action('AI assisted search activated!'),
};

export default metadata;

export const Default = createStory();
