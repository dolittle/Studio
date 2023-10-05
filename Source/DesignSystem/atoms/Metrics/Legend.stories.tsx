// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { DataSet } from './data';
import { Legend } from './Legend';

const { metadata, createStory } = componentStories(Legend);

export default metadata;

const datasets: DataSet[] = [
    {
        group: 'Runtime',
        name: 'CPU Usage',
        values: [],
    },
    {
        group: 'Head',
        name: 'CPU Usage',
        values: [],
    },
];

export const Default = createStory({
    data: datasets,
});
