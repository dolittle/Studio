// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { componentStories } from '@dolittle/design-system';

import { Form } from './Form';
import { Input } from './Input';

const { metadata, createStory } = componentStories(Input, {
    actions: {
        onChange: 'changed'
    },
    wrapper: ({ component }) => (
        <Form initialValues={{}}>
            { component }
        </Form>
    )
});

export default metadata;

export const Default = createStory({
    id: 'application-name',
    label: 'Application Name',
    required: true,
});
