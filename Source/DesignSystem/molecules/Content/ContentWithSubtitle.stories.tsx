// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, ContentWithSubtitle } from '../../index';

const { metadata, createStory } = componentStories(ContentWithSubtitle);

metadata.title = 'Content/Content With Subtitle';

metadata.parameters = {
    docs: {
        description: {
            component: `A content with a top divider and a header. The header can contain an optional info tooltip.`,
        },
    },
};

metadata.argTypes = {
    sx: { control: false },
};

metadata.args = {
    title: 'This is the title',
    children: 'This is the children.',
};

export default metadata;

export const Default = createStory();

export const WithInfoTooltip = createStory({
    infoTooltipLabel: 'This is an info tooltip label.',
});
WithInfoTooltip.parameters = {
    docs: {
        description: {
            story: 'The info tooltip label is optional.',
        },
    },
};
