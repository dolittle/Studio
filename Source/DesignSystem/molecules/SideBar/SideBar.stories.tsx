// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { componentStories, SideBar } from '@dolittle/design-system';

import { Router, SideBarPrimaryLinks, SideBarSecondaryLinks, DummyMainContent } from '../../helpers/dummyContent';

const { metadata, createStory } = componentStories(SideBar, {
    decorator: (story) => (
        <Router>
            <Box sx={{ display: 'flex' }}>
                {story()}

                <Box component='main' sx={{ p: 3 }}>
                    <Toolbar />
                    <DummyMainContent />
                </Box>
            </Box>
        </Router>
    ),
});

metadata.args = {
    primaryLinks: <SideBarPrimaryLinks />,
    secondaryLinks: <SideBarSecondaryLinks />,
};

export default metadata;

export const Default = createStory();
