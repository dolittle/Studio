// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, Form, Input, Tooltip } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Tooltip, {
    decorator: (Story) => (
        <Form<{ default: string }>
            initialValues={{ default: '' }}
            sx={{ mt: 2 }}>
            {Story()}
        </Form>
    ),
});

metadata.parameters = {
    docs: {
        description: {
            component: `When activated, tooltips display a text label identifying an element, 
        such as a description of its function or additional information about the item in question. 
        Important information should not be reserved for tooltips, but instead, displayed in the UI. 
        Tooltips are transient in that they appear on hover or click (when an element is in focus) and 
        disappear when the element is no longer in a hover state or no longer in focus. 
        They should always be displayed next to the element with which they are associated and should wrap 
        when the content is wider than the max-width of its associated element. 
        Position tooltips so that they do not cover up the underlying content when activated. 
        Common use cases for tooltips are icon only buttons, truncated labels on data grids, or to display
        relevant information when an item is in focus such as a input textfield.` },
    },
    controls: { include: ['tooltipTitle', 'tooltipText'] },
};

metadata.argTypes = {
    tooltipText: {
        control: { type: 'text' },
    },
};

metadata.args = {
    tooltipTitle: 'Default tooltip',
    tooltipText: 'This is example text for the right aligned focused Input field.',
    children: <Input id='default' label='Click to show tooltip...' />,
};

export default metadata;

export const Default = createStory();

export const HoverTooltip = createStory({
    displayOnHover: true,
    children: <Input id='default' label='Hover to show tooltip...' />,
});
HoverTooltip.parameters = {
    docs: {
        description: {
            story: `Hover tooltips are useful when space is at a premium, especially whenneeding to elaborate on an element's
            function or provide more information.
            Position hover tooltips so that they are close enough to the element they are referring to but do not cover up or hide
            other elements and information on the page.`
        },
    },
};
