// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '../../componentStories';
import { NewSwitch } from './';

const { metadata, createStory } = componentStories(NewSwitch, {
    actions: { onChange: 'Changed' },
});

metadata.parameters = {
    docs: {
        description: {
            component: `Switches toggle the state of a single setting on or off. They are the preferred way to adjust settings on mobile.
            If the user has several items to select on or off for, consider using checkboxes on desktop.
            Clearly indicate with the label what will happen when the user toggles it on or off.
            On switches should always use the primary color. Off switches should use the inherit color.`
        },
    },
    controls: { include: ['label', 'size', 'isDisabled'] },
};

metadata.args = {
    label: 'Default switch',
    size: 'small',
    isDisabled: false,
};

export default metadata;

export const Default = createStory();

export const DefaultOn = createStory({
    label: 'Default on switch',
    checked: true,
});
