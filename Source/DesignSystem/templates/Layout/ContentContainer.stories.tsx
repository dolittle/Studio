// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, ContentContainer } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(ContentContainer);

metadata.args = {
    children: 'ContentContainer',
};

export default metadata;

export const Default = createStory();
