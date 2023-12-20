// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories, AigonHelper } from '../../index';

const { metadata, createStory } = componentStories(AigonHelper);

metadata.title = 'AIAssistant/Aigon Helper';

metadata.parameters = {
    docs: {
        description: {
            component: 'Aigon Helper is a component that can be used to turn on AI-assisted search.',
        },
    },
};

metadata.args = {
    onAigonActivate: action('Aigon activated!'),
};

export default metadata;

export const Default = createStory();
