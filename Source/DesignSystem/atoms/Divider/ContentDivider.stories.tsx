// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, ContentDivider } from '../../index';

const { metadata, createStory } = componentStories(ContentDivider);

metadata.title = 'Divider/Content Divider';

metadata.parameters = {
    docs: {
        description: {
            component: 'The ContentDivider component is a divider with a custom border color.',
        },
    },
};

export default metadata;

export const Default = createStory();
