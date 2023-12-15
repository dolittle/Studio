// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { action } from '@storybook/addon-actions';

import { componentStories, AigonHelper } from '../../index';

const { metadata, createStory } = componentStories(AigonHelper);

metadata.title = 'AIAssistant/Aigon Helper';

metadata.parameters = {
    docs: {
        description: {
            component: 'Write the description of the component here.',
        },
    },
};

metadata.argTypes = {};

metadata.args = {};

export default metadata;

export const Default = createStory();
