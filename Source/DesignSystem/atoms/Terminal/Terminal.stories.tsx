// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { Terminal } from './Terminal';
import { createFakeServer } from './fake';

const { metadata, createStory } = componentStories(Terminal);

export default metadata;

export const Default = createStory({
    connect: async () => {
        return createFakeServer();
    },
    sx: {
        height: '600px',
    },
});

export const ConnectFailure = createStory({
    connect: async () => {
        throw new Error('Will never connect');
    },
    sx: {
        height: '600px',
    },
});
