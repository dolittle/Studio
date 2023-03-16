// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, LoadingSpinner } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(LoadingSpinner);

//TODO: update component to include text
metadata.parameters = {
    docs: {
        description: { component: `A loading spinner is a progress indicator used to inform users about the status of ongoing processes, 
        such as loading data or submitting a form. Provide a descriptive label that indicates the status to the user. 
        By default, loading spinners are in an indeterminate state.` },
    },
    layout: 'centered',
};

export default metadata;

export const Default = createStory({});

export const ErrorSpinner = createStory({});

//TODO: Implement component
ErrorSpinner.parameters = {
    docs: {
        description: {
            story: `When the information is not processed successfully, we provide a clear indication in the UI to the user. 
            The spinner changes to an error icon with a new description indicating what happened and how the user can resolve it. 
            Use the main error color.`
        }
    }
};

//TODO: Implement component
export const SuccessSpinner = createStory({});

SuccessSpinner.parameters = {
    docs: {
        description: {
            story: `When the information has been processed successfully we provide a clear indication in the UI to the user. 
            The spinner changes to a checkmark icon with a new description indicating what happened. Use the main success color.`
        }
    }
};