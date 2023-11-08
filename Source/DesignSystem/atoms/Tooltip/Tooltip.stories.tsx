// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { componentStories, Tooltip } from '../../index';

// TODO: Update component to improve text.

const { metadata, createStory } = componentStories(Tooltip);

metadata.parameters = {
    docs: {
        description: {
            component: `When activated, form fields tooltips display a text label identifying an element, 
        such as a description of its function or additional information about the item in question.

        Important information should not be reserved for tooltips, but instead, displayed in the UI.

        Tooltips are transient in that they appear on hover or click (when an element is in focus) and
        disappear when the element is no longer in a hover state or no longer in focus.

        They should always be displayed next to the element with which they are associated and should wrap
        when the content is wider than the max-width of its associated element.

        Position tooltips so that they do not cover up the underlying content when activated.

        Common use cases for tooltips are icon only buttons, truncated labels on data grids, or to display
        relevant information when an item is in focus such as a input textfield.`
        },
    },
};

metadata.argTypes = {
    children: { control: false },
};

metadata.args = {
    title: 'This is the tooltip title',
    placement: 'right',
    children: <Typography sx={{ display: 'inline' }}>Hover to see the tooltip.</Typography>,
};

export default metadata;

export const Default = createStory();
