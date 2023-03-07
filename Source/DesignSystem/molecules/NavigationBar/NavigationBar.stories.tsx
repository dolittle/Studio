// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, NavigationBar } from '@dolittle/design-system';

import { MainLinks, MoreOptions, SelectionMenu, SecondaryLinks, Router } from '../../helpers/dummyContent';

const { metadata, createStory } = componentStories(NavigationBar, {
    decorator: (story) => (
        <Router>
            {story()}
        </Router>
    ),
});

metadata.parameters = {
    controls: { include: [] }
};

metadata.args = {
    mainLinks: <MainLinks />,
    secondaryLinks: <MoreOptions />,
    mobileDropdownMenu: <SelectionMenu />,
    mobileSecondaryLinks: <SecondaryLinks />,
};

export default metadata;

export const Default = createStory();
