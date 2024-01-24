// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { action } from '@storybook/addon-actions';

import { componentStories, AigonSearchBar } from '../../index';

const { metadata, createStory } = componentStories(AigonSearchBar);

metadata.title = 'AIAssistant/Aigon Search Bar';

metadata.parameters = {
    docs: {
        description: {
            component: 'A search bar that can be used to search with open AI.',
        },
    },
};

metadata.argTypes = {};

metadata.args = {
    onAigonDeactivate: action(`Aigon's close button was clicked!`),
};

export default metadata;

export const Default = createStory();
