// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { ConfirmDialog } from './ConfirmDialog';

const { metadata, createStory } = componentStories(ConfirmDialog, {});

export default metadata;

export const DialogBox = createStory({
    id: 'alert-dialog-title',
    open: true,
    title: 'This is a dialog box.',
    description: 'This is a description of the dialog box.',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
});
