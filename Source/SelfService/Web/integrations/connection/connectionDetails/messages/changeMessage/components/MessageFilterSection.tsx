// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useFormState } from 'react-hook-form';

import { Box, Typography } from '@mui/material';
import { Button, Link, ContentParagraph, ContentSection, Input } from '@dolittle/design-system';

import { ViewModeProps } from '../ViewMode';
import { TextCopyBox } from '../../../../../../components/TextCopyBox';

export type MessageFilterSectionProps = ViewModeProps & {

};

export const MessageFilterSection = (props: MessageFilterSectionProps) => {

    const facilityFilteringExample = '(.Facility | tonumber == 220)';
    return (
        <ContentSection title='Filters'>
            <ContentParagraph>
                The filtering mechanism allows you to focus only on the relevant data to your application. It is applied per message type, allowing you to tailor different message types with other filters from the same table.
            </ContentParagraph>
            <ContentParagraph>
                Filters are defined using a jq predicate expression. The jq predicate is an expression based on the jq query language, which allows for filtering the data based on the JSON structure of the message type. You can learn more about jq here  <Link
                    label={'https://stedolan.github.io/jq/manual/'}
                    href={'https://stedolan.github.io/jq/manual/'}
                    target
                    ariaLabel='jq user manual'
                />
            </ContentParagraph>
            <ContentParagraph>
                Example of a jq predicate expression matching all messages with a Facility property with a value of 220:
                <TextCopyBox instructions={facilityFilteringExample} variant='monospace' />
            </ContentParagraph>
            <Input sx={{ mt: 2 }} id='jqFilter' label='jq predicate' multiline rows={3} isFullWidth />
        </ContentSection>
    );
};
