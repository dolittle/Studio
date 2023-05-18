// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, AccordionList } from '@dolittle/design-system';

import { dummyAccordionList, dummyAccordionListWithStatus } from '../../helpers/DummyContents';

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
    items: dummyAccordionListWithStatus,
});
