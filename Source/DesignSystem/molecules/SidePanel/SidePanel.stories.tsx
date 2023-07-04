// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { componentStories, SidePanel } from '../../index';

import { CurrentPath, Router } from '../../helpers/ReactRouter';

import { SidePanelNavigation } from '../../helpers/DummyContents';

const { metadata, createStory } = componentStories(SidePanel, {
    decorator: Story =>
        <Router>
            <Box sx={{ display: 'flex', minHeight: 400 }}>
                {Story()}

                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <CurrentPath />
                </Box>
            </Box>
        </Router>
});

metadata.title = 'Side Panel';

metadata.parameters = {
    controls: { include: [] },
    docs: {
        description: {
            component: `The side navigation panel contains sub-menu navigation items linked to the top navigation panel items.
            It can be made collapsable, using icons only. Menu names should be revealed upon hover when in the collapsed state with a tooltip.
            The side navigation panel uses the default background and elevation.`
        },
    },
};

metadata.args = {
    sidePanelNavigationItems: <SidePanelNavigation />,
};

export default metadata;

export const Default = createStory();
