// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Dialog } from '@dolittle/design-system';

export type DiscardChangesDialogProps = {
    isDialogOpen: boolean;
    onDialogCancel: () => void;
    onDialogClose: () => void;
};

export const DiscardChangesDialog = ({ isDialogOpen, onDialogCancel, onDialogClose }: DiscardChangesDialogProps) =>
    <Dialog
        id='discard-changes'
        isOpen={isDialogOpen}
        title='Are you sure that you want to discard these changes?'
        description={`By clicking ‘discard changes' none of the changes you have made to this screen will be stored.`}
        onCancel={onDialogCancel}
        cancelBtnLabel='Discard Changes'
        confirmBtnLabel='Continue Working'
        onConfirm={onDialogClose}
        onClose={onDialogClose}
    />;
