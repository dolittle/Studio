// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, LoadingSpinner } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(LoadingSpinner);

metadata.parameters = {
    layout: 'centered',
};

export default metadata;

export const Loading = createStory({});
