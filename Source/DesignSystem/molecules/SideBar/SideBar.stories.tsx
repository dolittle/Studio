// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { componentStories, SideBar } from '@dolittle/design-system';

import { SideBarPrimaryLinks, SideBarSecondaryLinks } from '../../helpers/dummyContent';
import { Router } from '../../helpers/ReactRouter';

const { metadata, createStory } = componentStories(SideBar, {
    decorator: (Story) => (
        <Router>
            <Box sx={{ minHeight: 300 }}>
                {Story()}
            </Box>
        </Router>
    ),
});

metadata.parameters = {
    controls: { include: [] },
};

metadata.args = {
    primaryLinks: <SideBarPrimaryLinks />,
    secondaryLinks: <SideBarSecondaryLinks />,
};

export default metadata;

export const Default = createStory();
