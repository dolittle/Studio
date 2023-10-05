// Copyright (c) Aigonix. All rights reserved.
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
            component: `A stepper conveys progress through numbered steps to provide a wizard-like flow. Use steppers to break down complex user tasks into digestible pieces. 
            Use simple, but descriptive names for the stepper labels. Steppers can be displayed horizontally or vertically and can be editable or non-editable. 
            Editable steppers should allow the user to return to a previous step with a 'Back' button or by clicking on the step itself. 
            Editing poses a distraction risk to form completion, however, removing the editing option can force a user to cancel the form and begin again with their changes. 
            Take caution when considering which to use. Steppers can also be linear or non-linear. Linear steppers require the user to complete the steps in order to move on to the next. 
            Always indicate in the stepper label if a step is optional.
            
* Horizontal stepper: this is ideal when contents of one step depend on an earlier step. 
* Vertical stepper: this is designed for narrow screens and ideal for mobile.
* Layout: steppers should fill the width or height of the content within.`,
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
