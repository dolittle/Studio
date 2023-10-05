// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { LegendLine } from './LegendLine';

const { metadata, createStory } = componentStories(LegendLine);

export default metadata;

export const Default = createStory({
    name: 'Default line',
    color: 'primary.dark',
    dashed: false,
});

export const Dashed = createStory({
    name: 'Dashed line',
    color: 'secondary.dark',
    dashed: true,
});
