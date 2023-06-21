// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Toolbar } from '@mui/material';

import { componentStories, NavigationBar } from '@dolittle/design-system';

import { CurrentPath, MobileSecondaryLinks, Router, SecondaryLinks, SelectionMenu } from '../../helpers/ReactRouter';

const primaryNavigationItems = [
    {
        href: '#',
        name: 'Primary 1',
    },
    {
        href: '#',
        name: 'Primary 2',
    },
    {
        href: '#',
        name: 'Primary 3',
    },
];

const { metadata, createStory } = componentStories(NavigationBar, {
    decorator: Story =>
        <Router>
            <Toolbar />
            <CurrentPath />
            {Story()}
        </Router>
});

metadata.parameters = {
    controls: { include: [] },
    docs: {
        description: {
            component: `The top navigation bar is always positioned at the top of the page and puts high priority destinations within reach on large screens. 
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
    logo: 'AigonixLightCube',
    primaryNavigationItems,
    optionsMenu: <SecondaryLinks />,
    //mobileDropdownMenu: <SelectionMenu />,
    //mobileSecondaryLinks: <MobileSecondaryLinks />,
};

export default metadata;

export const Default = createStory();
