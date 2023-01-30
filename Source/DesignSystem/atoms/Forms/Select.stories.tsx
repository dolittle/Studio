// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form, Select } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Select, {
    actions: {
        onChange: 'Value changed'
    },
    decorator: (Story) => (
        <Form initialValues={{
            default: '',
            dashedBorder: '',
            withDefaultValue: 'Value 2',
            disabled: ''
        }}>
            <Story />
        </Form>
    )
});

export default metadata;

// const selectOptions = [
//     { value: 'Value 1' },
//     { value: 'Value 2' },
//     { value: 'Value 3' }
// ];

// export const Default = createStory({
//     id: 'default',
//     label: 'Default select',
//     options: selectOptions
// });

// export const DashedBorder = createStory({
//     id: 'dashedBorder',
//     label: 'Dashed border',
//     options: selectOptions,
//     sx: { '& fieldset': { borderStyle: 'dashed' } }
// });

// export const WithDefaultValue = createStory({
//     id: 'withDefaultValue',
//     label: 'Default value selected',
//     options: selectOptions
// });

// export const Disabled = createStory({
//     id: 'disabled',
//     label: 'Disabled',
//     disabled: true,
//     options: selectOptions
// });
