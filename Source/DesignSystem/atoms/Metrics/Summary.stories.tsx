// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Summary } from './Summary';

export default {
    title: 'Metrics/Summary',
    component: Summary,
};

const Template: ComponentStory<typeof Summary> = (props) => <Summary {...props} />;

export const Normal = Template.bind({});
Normal.args = {
    now: { value: 10.1123456789774261321, tooltip: 'hello now' },
    avg: { value: 12 },
    max: 87,
    digits: 2,
    unit: '%'
};
