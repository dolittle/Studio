// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Toolbar } from '@mui/material';

import { componentStories, NavigationBar } from '@dolittle/design-system';

import { DummyMainContent, MainLinks, MoreOptions, SelectionMenu, SecondaryLinks, Router } from '../../helpers/dummyContent';

const { metadata, createStory } = componentStories(NavigationBar, {
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
    mainLinks: <MainLinks />,
    moreOptions: <MoreOptions />,
    mobileDropdownMenu: <SelectionMenu />,
    mobileSecondaryLinks: <SecondaryLinks />,
};

export default metadata;

export const Default = createStory();
