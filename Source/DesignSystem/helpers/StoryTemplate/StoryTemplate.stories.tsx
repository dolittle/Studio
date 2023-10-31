// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

// Import our custom made StoryTemplate component.
import { componentStories } from '../../index';

// Use the componentStories function to create a metadata object and a createStory function.
const { metadata, createStory } = componentStories(() => <></>);

// Set the title of the component.
metadata.title = 'Dummy component';

// Set the description of the component.
metadata.parameters = {
    docs: {
        description: {
            component: `Write the description of the component here.`
        },
    },
};

// Add the controls/props of the component.
metadata.argTypes = {
    // statusLevel: {
    //     control: {
    //         type: 'select',
    //         options: ['success', 'waiting', 'warning', 'error', 'unknown'],
    //     },
    // },
    // sx: { control: false },
};

// Set the default arguments/props of the component.
metadata.args = {};

// Export the metadata.
export default metadata;

// Create a Default story for the component. As it is without any props.
export const Default = createStory();

// Create a story for the component with a specific props.
// Add custom description/guidance for the story with 'parameters'.
export const SecondExample = createStory();
SecondExample.parameters = {
    docs: {
        description: {
            story: `Write the individual component story description here.`
        },
    },
};



// Without StoryTemplate:

// export default {
//     title: 'Component Name',
//     component: 'ComponentName',
//     parameters: {
//         docs: {
//             description: ``,
//         },
//     },
//     args: {},
//     argTypes: {},
// } as ComponentMeta<typeof ComponentName>;

// const Template: ComponentStory<typeof ComponentName> = args => {
//     //const [isOpen, setIsOpen] = useState(args.isOpen || false);
//     return (<></>);
// };

//export const Default = Template.bind({});

// export const AnotherVariant = Template.bind({});
// AnotherVariant.args = {
//     title: '',
//     description: '',
//     children: <></>,
// };
