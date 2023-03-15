// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, Stepper } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Stepper);

const finishedText = 'You have finished the stepper!';

const dummyText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel
    tincidunt lacinia, nunc nisl aliquam lorem, vitae aliquam nisl nunc vel lorem.
    Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam lorem, vitae aliquam`;

metadata.parameters = {
    docs: {
        description: {
            component: ``,
        },
    },
};

metadata.argTypes = {
    steps: {
        control: { disable: true },
    },
};

metadata.args = {
    steps: [
        {
            label: 'Step 1',
            render: () => dummyText,
        },
        {
            label: 'Step 2',
            render: () => dummyText,
        },
        {
            label: 'Step 3',
            render: () => dummyText,
        },
    ],
    finishedContent: finishedText,
};

export default metadata;

export const Default = createStory();

export const WithOptionalStep = createStory({
    optionalStepIndex: 1,
});
WithOptionalStep.parameters = {
    docs: {
        description: {
            story: ``,
        },
    },
};
