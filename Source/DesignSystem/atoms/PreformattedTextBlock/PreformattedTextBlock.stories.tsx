// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '../../index';

import { PreformattedTextBlock } from './PreformattedTextBlock';

const { metadata, createStory } = componentStories(PreformattedTextBlock);

metadata.title = 'Preformatted Text Block';

metadata.parameters = {
    docs: {
        description: {
            component: ``
        },
    },
};

metadata.args = {
    text: 'Default Preformatted Text Block',
};

export default metadata;

export const Default = createStory();
