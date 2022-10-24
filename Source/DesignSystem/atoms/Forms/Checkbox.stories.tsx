// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { componentStories } from '@dolittle/design-system';

import { Form } from './Form';
import { Checkbox } from './Checkbox';

const { metadata, createStory } = componentStories(Checkbox, {
    actions: {
        onChange: 'changed'
    },
    decorator: (Story) => (
        <Form initialValues={{
            production: false,
            productionWithDefault: true,
        }}>
            <Story />
        </Form>
    ),
});

export default metadata;

export const Default = createStory({
    id: 'production',
    label: 'Production',
});

export const Disabled = createStory({
    id: 'production',
    label: 'Production',
    disabled: true,
});

export const DisabledAndChecked = createStory({
    id: 'productionWithDefault',
    label: 'Production',
    disabled: true,
});
