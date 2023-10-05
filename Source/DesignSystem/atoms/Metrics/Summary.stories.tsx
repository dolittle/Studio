// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { Summary } from './Summary';

const { metadata, createStory } = componentStories(Summary);

export default metadata;

export const Normal = createStory({
    now: 10.1123456789774261321,
    avg: 12,
    max: 87,
    digits: 2,
    description: 'CPU usage',
    period: 'from last restart',
    unit: '%',
});

export const Default = createStory({
    now: 10.1123456789774261321,
    avg: 12,
    max: 87,
    period: 'last 24h',
});
