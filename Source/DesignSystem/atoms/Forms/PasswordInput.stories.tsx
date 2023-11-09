// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form, PasswordInput } from '@dolittle/design-system';

type StoriesValuesProps = {
    defaultInput: string;
};

const { metadata, createStory } = componentStories(PasswordInput, {
    actions: { onChange: 'changed' },
    decorator: (Story) => (
        <Form<StoriesValuesProps>
            initialValues={{
                defaultInput: '',
            }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    docs: {
        description: {
            component: `
The \`PasswordInput\` component is a wrapper around the \`Input\` component with a \`type='password'\` prop. It also masks the input, and allows the user to peek at the input, if they want
            ` },
    },
};

metadata.args = {
    id: 'password',
    label: 'Password',
};

export default metadata;

export const Default = createStory();
