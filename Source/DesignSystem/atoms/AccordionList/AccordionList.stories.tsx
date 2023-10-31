// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { componentStories, AccordionList, Button, InlineBox } from '../../index';

import { dummyAccordionList, dummyAccordionListWithStatus } from '../../helpers/DummyContents';

const { metadata, createStory } = componentStories(AccordionList);

metadata.parameters = {
    docs: {
        description: {
            component: `The AccordionList component is a convenient helper component that allows for easy composition
            of Accordion components. It's main use-case is to enable single-expand mode, where only a single Accordion
            component is expanded at a time.

The AccordionList component uses the Accordion component internally.
It does so using it in a <a href='https://mui.com/material-ui/react-accordion/#controlled-accordion' target='_blank'>controlled manner</a>
where the AccordionList owns the open/closed state of the Accordion components.`
        },
    },
};

metadata.args = {
    items: dummyAccordionList,
    singleExpandMode: false,
};

export default metadata;

export const Default = createStory();

export const InitialExpanded = createStory({
    items: dummyAccordionList,
    singleExpandMode: true,
    expandedModel: ['2'],
});
InitialExpanded.parameters = {
    docs: {
        description: {
            story: 'In this example, you can see the second accordion item is pre-expanded.',
        },
    },
};

export const SingleExpandMode = createStory({
    singleExpandMode: true,
});

export const WithStatusMessage = createStory({
    items: dummyAccordionListWithStatus,
});

export const WithProgrammaticallyChangingExpandedState = () => {
    const [items, setItems] = useState(dummyAccordionList);
    const [expandedModel, setExpandedModel] = useState<string[]>(['1', '3']);

    const toggleAccordionState = (id: string) => {
        setExpandedModel(current => {
            const newExpandedModel = [...current];

            if (current.includes(id)) {
                newExpandedModel.splice(newExpandedModel.indexOf(id), 1);
            } else {
                newExpandedModel.push(id);
            }

            return newExpandedModel;
        });
    };

    const getButtonLabel = (id: string) => {
        return `${expandedModel.includes(id) ? 'Collapse' : 'Expand'} Accordion ${id}`;
    };

    return (
        <>
            <Stack sx={{ mb: 3, gap: 1 }}>
                <InlineBox>
                    <Typography component='span'>Accordion 1 forced state: {expandedModel.includes('1').toString()}</Typography>
                    <Button onClick={() => toggleAccordionState('1')} label={getButtonLabel('1')} />
                </InlineBox>

                <InlineBox>
                    <Typography component='span'>Accordion 2 forced state: {expandedModel.includes('2').toString()}</Typography>
                    <Button onClick={() => toggleAccordionState('2')} label={getButtonLabel('2')} />
                </InlineBox>

                <InlineBox>
                    <Typography component='span'>Accordion 3 forced state: {expandedModel.includes('3').toString()}</Typography>
                    <Button onClick={() => toggleAccordionState('3')} label={getButtonLabel('3')} />
                </InlineBox>
            </Stack>

            <AccordionList items={items} expandedModel={expandedModel} onExpandedModelChange={setExpandedModel} />
        </>
    );
};
