// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, NoContentSection } from '../../index';

const { metadata, createStory } = componentStories(NoContentSection);

metadata.title = 'Content/No Content Section';

metadata.parameters = {
    docs: {
        description: {
            component: 'A component that displays an empty state with a title, description and a button.'
        },
    },
};

metadata.argTypes = {
    onCreate: { action: 'onCreate' },
    sx: { control: false },
};

metadata.args = {
    title: 'This is the title',
    description: 'This is the description',
    label: 'Create new',
    icon: 'AddCircle',
    isDisabled: false,
    sx: { p: 2 }
};

export default metadata;

export const Default = createStory();
