// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Layout } from '@dolittle/design-system';

import { dummyNavigationBar, dummySidePanel, DummyLayoutBreadcrumbs } from '../../helpers/DummyContents';

const { metadata, createStory } = componentStories(Layout, {
    decorator: Story =>
        <Router>
            {Story()}
        </Router>
});

metadata.parameters = {
    controls: {
        exclude: ['children'],
    },
};

metadata.args = {
    navigationBar: {
        logo: 'AigonixLightCube',
        primaryNavigationItems: <PrimaryNavigation />,
        secondaryNavigationItems: <SecondaryNavigation />,
        selectionMenuItems: <SelectionMenu />,
    },
    children: <CurrentPath />,
};

export default metadata;

export const Default = createStory();

export const WithSideBar = createStory({
    sidePanel: {
        sidePanelNavigationItems: <SidePanelNavigation />,
    },
});

export const WithSideBarAndBreadcrumbs = () =>
    <DummyLayoutBreadcrumbs />;
