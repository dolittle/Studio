// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from './Tabs';

export default {
    title: 'Tabs',
    component: Tabs,
} as ComponentMeta<typeof Tabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tabs> = (props) => <Tabs {...props} />;

export const Normal = Template.bind({});
Normal.args = {
    tabs: [
        {
            label: 'First tab',
            render: () => <h1>Hello</h1>
        },
        {
            label: 'Second tab',
            render: () => <h1>World</h1>
        },
    ]
};

export const Another = Template.bind({});
Another.args = {
    tabs: [
        {
            label: 'First tab with a very very very very long label',
            render: () => <h1>Hello</h1>
        },
        {
            label: 'Second tab',
            render: () => <h1>World</h1>
        },
    ]
};
