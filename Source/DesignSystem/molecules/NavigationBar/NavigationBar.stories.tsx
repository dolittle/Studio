// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Toolbar } from '@mui/material';

import { componentStories, NavigationBar } from '../../index';

import { CurrentPath, Router } from '../../helpers/ReactRouter';
import { dummyNavigationBar } from '../../helpers/DummyContents';

const { metadata, createStory } = componentStories(NavigationBar, {
    decorator: Story =>
        <Router>
            <Toolbar />
            <CurrentPath />
            {Story()}
        </Router>
});

metadata.parameters = {
    docs: {
        description: {
            component: `The top navigation bar is always positioned at the top of the page and puts high priority destinations
            within reach on large screens. The top navigation bar uses a background and elevation of 4.`
        },
    },
};

metadata.args = dummyNavigationBar;

export default metadata;

export const Default = createStory();
