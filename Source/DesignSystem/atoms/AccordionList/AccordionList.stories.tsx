// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, AccordionProps, AccordionList } from '@dolittle/design-system';

import { DummyChildrenContent } from '@dolittle/design-system/helpers/dummyContent';

const dummyAccordionList: AccordionProps[] = [
    {
        id: '1',
        title: 'Accordion 1',
        children: <DummyChildrenContent />,
    },
    {
        id: '2',
        title: 'Accordion 2',
        children: <DummyChildrenContent />,
    },
    {
        id: '3',
        title: 'Accordion 3',
        children: <DummyChildrenContent />,
    },
];

const { metadata, createStory } = componentStories(AccordionList);

metadata.parameters = {
    docs: {
        description: {
            component: `The AlertList component is a convenient helper component that allows for easy composition 
            of Accordion components. It's main use-case is to enable single-expand mode, where only a single Accordion 
            component is expanded at a time.`
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
    items: [
        {
            id: '1',
            title: 'Accordion 1',
            progressStatus: 'success',
            children: <DummyChildrenContent />,
        },
        {
            id: '2',
            title: 'Accordion 2',
            progressStatus: 'table-success',
            children: <DummyChildrenContent />,
        },
        {
            id: '3',
            title: 'Accordion 3',
            progressStatus: 'waiting',
            children: <DummyChildrenContent />,
        },
        {
            id: '4',
            title: 'Accordion 4',
            progressStatus: 'warning',
            children: <DummyChildrenContent />,
        },
        {
            id: '5',
            title: 'Accordion 5',
            progressStatus: 'error',
            children: <DummyChildrenContent />,
        },
        {
            id: '6',
            title: 'Accordion 6',
            progressStatus: 'unknown',
            children: <DummyChildrenContent />,
        },
    ],
});
