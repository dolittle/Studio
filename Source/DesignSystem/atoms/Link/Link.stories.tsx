// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, Link } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Link);

export default metadata;

export const Primary = createStory({
    href: 'https://dolittle.io',
    target: true,
    ariaLabel: 'To learn more, visit our website which opens in a new window.',
    message: 'Go to Dolittle website'
});

export const Secondary = createStory({
    href: '#',
    color: 'secondary',
    message: 'Secondary link'
});

export const Subtle = createStory({
    href: '#',
    color: 'text.primary',
    message: 'Subtle link'
});
