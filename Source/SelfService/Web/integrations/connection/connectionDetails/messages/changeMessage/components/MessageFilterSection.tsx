// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFormState } from 'react-hook-form';

import { Button, ContentParagraph, ContentSection, Input } from '@dolittle/design-system';

import { ViewModeProps } from '../ViewMode';

export type MessageFilterSectionProps = ViewModeProps & {

};

export const MessageFilterSection = (props: MessageFilterSectionProps) => {

    return (
        <ContentSection hideHeader>
            <ContentParagraph>
                Something something filters filters
            </ContentParagraph>
            <Input id='jqFilter' label='jq predicate' multiline rows={3} isFullWidth/>
        </ContentSection>
    );
};
