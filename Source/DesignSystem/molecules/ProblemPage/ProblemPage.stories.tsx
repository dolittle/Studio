// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '../..';
import { ProblemPage } from './ProblemPage';

const { metadata, createStory } = componentStories(ProblemPage);

metadata.title = 'Problem Page';

metadata.args = {
    variant: 'maintenance',
};

export default metadata;

export const Default = createStory();

export const Maintenance = createStory({
    variant: 'maintenance',
});

export const Problem = createStory({
    variant: 'problem',
});

export const Building = createStory({
    variant: 'building',
});
