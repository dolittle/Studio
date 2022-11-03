// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { SwitchToggle } from './SwitchToggle';

const { metadata, createStory } = componentStories(SwitchToggle, {
    actions: {
        onChange: 'Changed',
    },
});

export default metadata;

export const Default = createStory({
    title: 'Default switch with label',
});

// Needs useState for value changes.
export const DefaultActive = createStory({
    title: 'Default active switch with label',
    checked: true,
});

export const DisabledSwitch = createStory({
    title: 'Disabled switch with label',
    disabled: true,
});
