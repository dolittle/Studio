// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { componentStories, Form, FormFieldTooltip, Input, Select } from '../../index';

// TODO: Update component to improve text.

const selectOptions = [
    { value: 'Option 1', displayValue: 'Option 1' },
    { value: 'Option 2', displayValue: 'Option 2' },
    { value: 'Option 3', displayValue: 'Option 3' },
];

type DefaultFormParameters = {
    input: string;
    select: string;
};

const { metadata, createStory } = componentStories(FormFieldTooltip, {
    actions: { onOpen: 'Tooltip opened!' },
    decorator: Story => (
        <Form<DefaultFormParameters>
            initialValues={{
                input: '',
                select: '',
            }}
            sx={{ m: 2 }}
        >
            {Story()}
        </Form>
    ),
});

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
    controls: { include: ['title', 'description', 'displayOnHover'] },
};

metadata.args = {
    title: 'This is the title',
    description: 'This is the description of the form field tooltip. It can be a string or a ReactNode.',
    displayOnHover: false,
    children: <Input id='input' label='Click to show tooltip...' />,
};

export default metadata;

export const Default = createStory();

export const DisplayOnHover = createStory({
    displayOnHover: true,
    children: <Input id='default' label='Hover to show tooltip...' />,
});
DisplayOnHover.parameters = {
    docs: {
        description: {
            story: `Hover tooltips are useful when space is at a premium, especially when needing to elaborate on an element's
            function or provide more information.
            Position hover tooltips so that they are close enough to the element they are referring to but do not cover up or hide
            other elements and information on the page.`
        },
    },
};

export const WithControlledOpen = () => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const handleTooltipOpen = () => setIsTooltipOpen(true);
    const handleTooltipClose = () => setIsTooltipOpen(false);

    return (
        <FormFieldTooltip
            title='This is the title of the tooltip'
            description='This is the description of the tooltip. It can be a string or a ReactNode.'
            isOpen={isTooltipOpen}
            onOpen={handleTooltipOpen}
            onClose={handleTooltipClose}
        >
            <Select
                id='select'
                label='Click to show the tooltip...'
                options={selectOptions}
                onOpen={handleTooltipOpen}
            />
        </FormFieldTooltip>
    );
};
WithControlledOpen.parameters = {
    docs: {
        description: {
            story: `You can use the open, onOpen and onClose props to control the behavior of the form field tooltip.
            This is useful when you want to implement a custom behavior.
            You can use this with components that don't have a hover state, like a button.`
        },
    },
};
