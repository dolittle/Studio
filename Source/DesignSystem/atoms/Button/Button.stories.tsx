// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { Button } from './Button';

const { metadata, createStory } = componentStories(Button, {
    actions: {
        onClick: 'clicked',
    },
});

export default metadata;

export const Filled = createStory({
    variant: 'filled',
    label: 'Filled Button',
});

export const Text = createStory({
    variant: 'text',
    label: 'Text Button',
});

export const Outlined = createStory({
    variant: 'outlined',
    label: 'Outlined Button',
});
