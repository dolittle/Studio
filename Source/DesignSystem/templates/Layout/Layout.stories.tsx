// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories } from '@dolittle/design-system';

import { Layout } from './Layout';

import { DummyMainContent, Router } from '../../helpers/dummyContent';

const { metadata, createStory } = componentStories(Layout, {
    decorator: (story) => (
        <Router>
            {story()}
        </Router>
    ),
});

metadata.args = {
    children: <DummyMainContent />,
};

export default metadata;

export const Default = createStory();
