// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, NavigationBar } from '@dolittle/design-system';

import { MainLinks, SecondaryLinks, SelectionMenu, MobileSecondaryLinks, Router } from '../../helpers/dummyContent';

const { metadata, createStory } = componentStories(NavigationBar, {
    decorator: (Story) => (
        <Router>
            {Story()}
        </Router>
    ),
});

metadata.parameters = {
    controls: { include: [] }
};

metadata.args = {
    mainLinks: <MainLinks />,
    secondaryLinks: <SecondaryLinks />,
    mobileDropdownMenu: <SelectionMenu />,
    mobileSecondaryLinks: <MobileSecondaryLinks />,
};

export default metadata;

export const Default = createStory();
