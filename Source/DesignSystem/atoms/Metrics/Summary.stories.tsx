// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Summary } from './Summary';

export default {
    title: 'Metrics/Summary',
    component: Summary,
}

const Template: ComponentStory<typeof Summary> = (props) => <Summary {...props} />;

export const Normal = Template.bind({});
Normal.args = {
    now: 10.1,
    avg: 12,
    max: 87,
    tooltip: "Some tooltip"
};
