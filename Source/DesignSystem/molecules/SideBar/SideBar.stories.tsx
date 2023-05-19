// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { componentStories, SideBar } from '@dolittle/design-system';

import { CurrentPath, Router, SideBarPrimaryLinks, SideBarSecondaryLinks } from '../../helpers/ReactRouter';

const { metadata, createStory } = componentStories(SideBar, {
    decorator: (Story) => (
        <Router>
            <Box sx={{ display: 'flex', minHeight: 400 }}>
                {Story()}

                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <CurrentPath />
                </Box>
            </Box>
        </Router>
    ),
});

metadata.parameters = {
    controls: { include: [] },
    docs: {
        description: {
            component: `The side navigation bar contains sub-menu navigation items linked to the top navigation bar items. It can be made collapsable, 
            using icons only. Menu names should be revealed upon hover when in the collapsed state with a tooltip. 
            The side navigation bar uses the default background and elevation.`
        },
        source: {
            code: `
<SideBar
    primaryLinks={<SideBarPrimaryLinks />}
    secondaryLinks={<SideBarSecondaryLinks />}
/>`,
        },
    },
};

metadata.args = {
    primaryLinks: <SideBarPrimaryLinks />,
    secondaryLinks: <SideBarSecondaryLinks />,
};

export default metadata;

export const Default = createStory();
