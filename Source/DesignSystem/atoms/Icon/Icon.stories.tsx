// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Icon, availableIcons, SvgIconsDefinition } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Icon);

metadata.parameters = {
    docs: {
        description: {
            component: `Icons are purely decorative and used to life the UI. Icons can help users more easily scan a long list.

They can also be used to help separate groups of items or data such as cards or statuses. 
Avoid unneccessarily adding icons so as not to clutter the UI and overwhelm the user.`
        },
    },
};

metadata.args = {
    icon: 'Dolittle',
    color: 'inherit',
    size: 'small',
};

export default metadata;

export const Default = createStory();

export const IconsWeUse = () =>
    availableIcons.map(key => <Icon key={key} icon={key as SvgIconsDefinition} sx={{ m: 1 }} />);
