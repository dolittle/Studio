// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, CopyIconButton } from '../../index';

const { metadata, createStory } = componentStories(CopyIconButton);

metadata.title = 'Icon Button/Copy Icon Button';

metadata.parameters = {
    docs: {
        description: {
            component: 'The copy icon button component is a button that copies the text to the clipboard.'
        },
    },
};

metadata.args = {
    text: 'Text copied to clipboard.',
    message: 'Text copied to clipboard.',
    tooltipText: 'Copy text.',
};

export default metadata;

export const Default = createStory();
