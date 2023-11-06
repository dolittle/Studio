// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, LoadingSpinner } from '../../index';

const { metadata, createStory } = componentStories(LoadingSpinner);

// TODO: Update component to improve text.

metadata.parameters = {
    docs: {
        description: {
            // Provide a descriptive label that indicates the status to the user. By default, loading spinners are in an indeterminate state.
            component: `A loading spinner is a progress indicator used to inform users about the status of ongoing processes, 
        such as loading data or submitting a form.` },
    },
};

metadata.argTypes = {
    ref: {
        control: false,
        description: 'MUI CircularProgress props.',
    },
};

metadata.args = {
    fullPage: false,
};

export default metadata;

export const Default = createStory();
