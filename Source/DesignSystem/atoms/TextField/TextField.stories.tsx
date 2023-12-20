// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, TextField } from '../../index';

const { metadata, createStory } = componentStories(TextField);

export default metadata;

metadata.title = 'Text Field';

metadata.parameters = {
    docs: {
        description: {
            component: `Text fields allow users to enter text into a UI.`
        },
    },
    controls: {
        exclude: ['onValueChange', 'value', 'sx'],
    },
};

metadata.args = {
    label: '',
    size: 'small',
    placeholder: '',
    helperText: '',
    isDisabled: false,
    isFullWidth: false,
    startIcon: undefined,
    endIcon: undefined,
    iconColor: undefined,
    onValueChange: () => { },
};

export const Default = createStory();

export const Overrides = createStory({
    overrides: {
        InputProps: {
            endAdornment:
                <IconButton tooltipText='This is an added action button.' icon='AddBoxRounded' onClick={action('IconButton was clicked!')} />,
        },
    },
});
