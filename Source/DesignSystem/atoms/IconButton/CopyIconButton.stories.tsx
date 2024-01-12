// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, CopyIconButton } from '../../index';

const { metadata, createStory } = componentStories(CopyIconButton);

metadata.title = 'Icon Button/Copy Icon Button';

metadata.parameters = {
    docs: {
        description: {
            component: 'The copy icon button component is a button that copies the text to the clipboard.',
        },
    },
};

metadata.args = {
    textToCopy: 'This is the text to copy to the clipboard.',
    snackbarMessage: 'The message to show in the snackbar.',
    color: 'inherit',
    tooltipText: 'The tooltip text to show when hovering over the icon button.',
};

export default metadata;

export const Default = createStory();
