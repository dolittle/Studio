// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

import { componentStories, NavigationBar } from '@dolittle/design-system';

import { MainLinks, SecondaryLinks, SelectionMenu, MobileSecondaryLinks } from '../../helpers/dummyContent';
import { Content, Router } from '../../helpers/ReactRouter';

const { metadata, createStory } = componentStories(NavigationBar, {
    decorator: (Story) => (
        <Router>
            <Box>
                <Toolbar />
                <Routes>
                    <Route path='*' element={<Content />} />
                </Routes>

                {Story()}
            </Box>
        </Router>
    ),
});

metadata.parameters = {
    controls: { include: [] },
    docs: {
        description: { component: `The top navigation bar is always positioned at the top of the page and puts high priority destinations within reach on large screens. 
        The top navigation bar uses a background and elevation of 4. ` },
        source: {
            code: `
 <NavigationBar
   mainLinks={<MainLinks />}
   mobileDropdownMenu={<SelectionMenu />}
   mobileSecondaryLinks={<MobileSecondaryLinks />}
   secondaryLinks={<SecondaryLinks />}
 />`,
        },
    },
};

metadata.args = {
    mainLinks: <MainLinks />,
    secondaryLinks: <SecondaryLinks />,
    mobileDropdownMenu: <SelectionMenu />,
    mobileSecondaryLinks: <MobileSecondaryLinks />,
};

export default metadata;

export const Default = createStory();
