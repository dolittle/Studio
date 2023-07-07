// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Layout } from '@dolittle/design-system';

import { CurrentPath, Router } from '../../helpers/ReactRouter';

import { dummyNavigationBar, dummySidePanel, DummyLayoutBreadcrumbs } from '../../helpers/DummyContents';

const { metadata, createStory } = componentStories(Layout, {
    decorator: Story =>
        <Router>
            {Story()}
        </Router>
});

metadata.parameters = {
    controls: {
        include: [],
    },
};

metadata.args = {
    navigationBar: dummyNavigationBar,
    children: <CurrentPath />,
    sx: { minHeight: 'auto' },
};

export default metadata;

export const Default = createStory();

export const WithSideBar = createStory({
    sidePanel: dummySidePanel,
});

export const WithSideBarAndBreadcrumbs = () =>
    <DummyLayoutBreadcrumbs />;
