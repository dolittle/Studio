// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { Graph } from './Graph';

import data from './sample.json';

const { metadata, createStory } = componentStories(Graph);

export default metadata;

export const Normal = createStory({
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
});
