// Copyright (c) Dolittle. All rights reserved.
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
                The filtering mechanism helps you focus on the data you are interested in instead of having to deal with all the data and filtering when you are processing it.
            </ContentParagraph>
            <ContentParagraph>
                To filter the data to your needs, you can use a jq predicate. The jq predicate is a JSON query language that allows you to filter the data based on the JSON structure.
                You can learn more about jq here <Link
                    target
                    ariaLabel='jq user manual'
                    href={'https://stedolan.github.io/jq/manual/'}
                    message={'https://stedolan.github.io/jq/manual/'}
                />
            </ContentParagraph>
            <ContentParagraph>
                Here is an example of a jq filter that matches all messages that have a Facility property with a value of 220. This way you can filter out all messages that are not relevant to you:
                <TextCopyBox instructions={'(.Facility | tonumber == 220)'}>
                    <Typography component={'span'} variant='monospace'>(.Facility | tonumber == 220)</Typography>
                    <br />
                    <br />
                </TextCopyBox>
                <TextCopyBox instructions={facilityFilteringExample} variant='monospace' />
            </ContentParagraph>
            <Input sx={{ mt: 2 }} id='jqFilter' label='jq predicate' multiline rows={3} isFullWidth />
        </ContentSection>
    );
};
