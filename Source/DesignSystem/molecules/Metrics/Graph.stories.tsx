// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { Graph } from './Graph';

import data from './sample.json';

const { metadata, createStory } = componentStories(Graph);

export default metadata;

export const Normal = createStory({
    title: 'CPU Usage',
    subtitle: 'Last 24 hours',
    unit: 'CPUs',
    data: [
        {
            group: 'Head',
            name: 'CPU Usage',
            values: data.first,
        },
        {
            group: 'Runtime',
            name: 'CPU Usage',
            values: data.second,
        },
    ],
    range: [0, 2],
});

export const Empty = createStory({
    title: 'CPU Usage',
    subtitle: 'Last 24 hours',
    unit: 'CPUs',
    data: [],
    domain: [data.first[0].time, data.first.slice(-1)[0].time],
    range: [0, 2],
});
