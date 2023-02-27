// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, Link } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Link);

metadata.args = {
    href: '#',
    target: false,
    ariaLabel: undefined,
    color: 'primary',
    message: 'Default internal link',
};

export default metadata;

export const Default = createStory();

export const ExternalLink = createStory({
    href: 'https://dolittle.io',
    target: true,
    ariaLabel: 'To learn more, visit our website which opens in a new window.',
    message: 'Go to Dolittle website',
});

export const SecondaryLink = createStory({
    href: '#',
    color: 'secondary',
    message: 'Informative link',
});

export const SubtleLink = createStory({
    href: '#',
    color: 'subtle',
    message: 'Link, that is not so important',
});
