// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

// Import our custom made StoryTemplate component.
import { componentStories } from '@dolittle/design-system';

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
metadata.argTypes = {};

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
