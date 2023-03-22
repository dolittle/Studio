// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Typography } from '@mui/material';

import componentStories from 'Source/DesignSystem/componentStories';
import { AccordionList, AccordionListProps } from './AccordionList';
import { AccordionProps } from '../Accordion/Accordion';

const DummyChildrenContent = () =>
    <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo similique consequuntur dolores natus ex
        sunt esse mollitia id atque. Atque molestiae cum magnam eligendi maxime id sapiente quaerat suscipit?
    </Typography>;
const dummyAccordionList: AccordionProps[] = [
    {
        id: '1',
        title: 'Accordion 1',
        children: <DummyChildrenContent />
    },
    {
        id: '2',
        title: 'Accordion 2',
        children: <DummyChildrenContent />
    },
    {
        id: '3',
        title: 'Accordion 3',
        children: <DummyChildrenContent />
    },
];

const { metadata, createStory } = componentStories(AccordionList);

metadata.parameters = {
    docs: {
        description: {
            component: `The AlertList component is a convenient helper component
that allows for easy composition of Accordion components. It's main use-case is
to enable single-expand mode, where only a single Accordion component is expanded
at a time.`
        }
    }
};
metadata.argTypes={
    singleExpandMode: { control: true }
};

metadata.args = {
    items: dummyAccordionList,
    singleExpandMode: true
};


export default metadata;

export const Default = createStory();

export const InitialExpanded = createStory();
InitialExpanded.parameters = {
    docs: {
        story:`In this example, you can see the second accordion item is pre-expanded`,
    }
};

InitialExpanded.args = {
    items: dummyAccordionList,
    singleExpandMode: true,
    initialId: '2'
};
