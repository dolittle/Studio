// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFormState } from 'react-hook-form';

import { Button, ContentDivider } from '@dolittle/design-system';

import { ViewModeProps } from '../../ViewMode';

export type SubmitButtonSectionProps = ViewModeProps & {
    isSubmitting: boolean;
};

export const SubmitButtonSection = ({ mode, isSubmitting }: SubmitButtonSectionProps) => {
    const { isValid, isDirty } = useFormState();

    const buttonText = mode === 'new' ? 'Add Message And Close' : 'Save Message And Close';

    return (
        <>
            <ContentDivider sx={{ mt: 3 }} />

            <Button
                label={isSubmitting ? 'Saving...' : buttonText}
                variant='fullwidth'
                type='submit'
                disabled={!isValid || !isDirty || isSubmitting}
                sx={{ mt: 2.125 }}
            />
        </>
    );
};
