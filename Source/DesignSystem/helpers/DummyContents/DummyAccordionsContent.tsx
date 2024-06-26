// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { AccordionListItem } from '@dolittle/design-system';

import { DummyChildrenContent } from './DummyText';

export const dummyAccordionList: AccordionListItem[] = [
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

export const dummyAccordionListWithStatus: AccordionListItem[] = [
    {
        id: '1',
        title: 'Accordion 1',
        statusLevel: 'success',
        children: <DummyChildrenContent />,
    },
    {
        id: '2',
        title: 'Accordion 2',
        statusLevel: 'waiting',
        children: <DummyChildrenContent />,
    },
    {
        id: '3',
        title: 'Accordion 3',
        statusLevel: 'warning',
        children: <DummyChildrenContent />,
    },
    {
        id: '4',
        title: 'Accordion 4',
        statusLevel: 'error',
        children: <DummyChildrenContent />,
    },
    {
        id: '5',
        title: 'Accordion 5',
        statusLevel: 'unknown',
        children: <DummyChildrenContent />,
    },
];
