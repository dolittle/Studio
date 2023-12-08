// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, ContentContainer } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(ContentContainer);

metadata.title = 'Content/Content Container';

metadata.parameters = {
    docs: {
        description: {
            component: 'A container for content with a paper background.',
        },
    },
};

metadata.argTypes = {
    sx: { control: false },
};

metadata.args = {
    children: 'This is the content of the container.',
};

export default metadata;

export const Default = createStory();
