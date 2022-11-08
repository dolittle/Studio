// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { Select } from './Select';

const { metadata, createStory } = componentStories(Select, {
    actions: {
        onChange: 'Value changed',
    }
});

export default metadata;

// Needs useState for input value changes.
const selectOptions = [
    { value: 'Value 1' },
    { value: 'Value 2' },
    { value: 'Value 3' },
];

export const Default = createStory({
    label: 'Default select',
    options: selectOptions,
    sx: { width: 220 }
});

export const WithDashedBorder = createStory({
    label: 'Dashed border',
    options: selectOptions,
    sx: {
        'width': 220,
        '& fieldset': {
            borderStyle: 'dashed'
        }
    }
});

export const WithSelectedValue = createStory({
    label: 'Default value selected',
    value: 'Value 1',
    disabled: true,
    options: selectOptions,
    sx: { width: 220 }
});

export const DisabledSelect = createStory({
    label: 'Disabled',
    disabled: true,
    options: selectOptions,
    sx: { width: 220 }
});
