// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFormState } from 'react-hook-form';

import { Button } from '@dolittle/design-system';

export type CancelOrDiscardButtonProps = {
    onCancelled: () => void;
    onDiscarded: () => void;
};

export const CancelOrDiscardButton = (props: CancelOrDiscardButtonProps) => {
    const { isDirty } = useFormState();

    return (
        <Button
            label={isDirty ? 'Discard changes' : 'Cancel'}
            startWithIcon={'CancelRounded'}
            color={'subtle'}
            onClick={() => isDirty ? props.onDiscarded() : props.onCancelled()}
        />
    );
};
