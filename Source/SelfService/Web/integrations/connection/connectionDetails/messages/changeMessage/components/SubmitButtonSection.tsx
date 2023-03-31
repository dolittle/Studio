// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Button } from '@dolittle/design-system';
import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';

export type SubmitButtonSectionProps = ViewModeProps & {
    disabled?: boolean;
    isSubmitting: boolean
};

export const SubmitButtonSection = (props: SubmitButtonSectionProps) => {
    const buttonText = props.mode === 'new' ? 'Add Message and close' : 'Save Message and close';
    return (
        <ContentSection hideHeader>
            <Button
                label={props.isSubmitting ? 'Saving...' : buttonText}
                variant='fullwidth'
                type='submit'
                sx={{ mt: 2.125 }}
                disabled={!props.disabled}
            />
        </ContentSection>
    );
};
