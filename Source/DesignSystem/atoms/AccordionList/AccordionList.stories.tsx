// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { componentStories, AccordionList, Button } from '@dolittle/design-system';
import { Box, Typography } from '@mui/material';

import { dummyAccordionList, dummyAccordionListWithStatus } from '../../helpers/DummyContents';

const { metadata, createStory } = componentStories(AccordionList);

metadata.parameters = {
    docs: {
        description: {
            component: `The AccordionList component is a convenient helper component that allows for easy composition
            of Accordion components. It's main use-case is to enable single-expand mode, where only a single Accordion
            component is expanded at a time.

The AccordionList component uses the Accordion component internally. It does so using it in a <a href='https://mui.com/material-ui/react-accordion/#controlled-accordion' target='_blank'>controlled manner</a>, where the AccordionList owns the open/closed state of the Accordion components.            `
        },
    },
};

metadata.argTypes = {
    initialId: { control: false },
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
    initialId: '2',
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

    const toggleAccordionState = (index: number) => () => {
        setItems(current => {
            const newItems = [...current];
            newItems[index].expanded = !newItems[index].expanded;
            return newItems;
        });
    };

    return <>
        <Box gap={1} display='flex' flexDirection='column' justifyItems='start'>
            <Box gap={1} display='flex' alignItems='center'>
                <Typography component='span'>Accordion 1 forced state: {items[0].expanded}</Typography>
                <Button onClick={toggleAccordionState(0)} label={`Force ${!items[0].expanded}`} />
            </Box>
            <Box gap={1} display='flex' alignItems='center'>
                <Typography component='span'>Accordion 2 forced state: {items[1].expanded}</Typography>
                <Button onClick={toggleAccordionState(1)} label={`Force ${!items[1].expanded}`} />
            </Box>
            <Box gap={1} display='flex' alignItems='center'>
                <Typography component='span'>Accordion 3 forced state: {items[2].expanded}</Typography>
                <Button onClick={toggleAccordionState(2)} label={`Force ${!items[2].expanded}`} />
            </Box>
        </Box >
        <AccordionList items={items} />
    </>;
};
