// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { ContentWithSubtitle, CopyIconButton, InlineWrapper, Input, Link } from '@dolittle/design-system';

export const MessageFilterSection = () => {
    const jqUserManualLink = 'https://stedolan.github.io/jq/manual/';
    const facilityFilteringExample = '(.Facility | tonumber == 220)';

    return (
        <ContentWithSubtitle title='Filters' infoTooltipLabel='The filtering mechanism allows you to focus only on the relevant data to your application.'>
            <Typography>
                Filters are applied per message type, allowing you to tailor different message types with other filters from the same table.
            </Typography>

            <Typography sx={{ mt: 3, mb: 2 }}>
                Filters are defined using a jq predicate expression.
                The jq predicate is an expression based on the jq query language, which allows for filtering the data based on the JSON structure of the message type.
            </Typography>

            <section>
                <Typography>Learn more about jq here:</Typography>

                <InlineWrapper>
                    <Link label={jqUserManualLink} href={jqUserManualLink} target ariaLabel='Jq user manual' />
                    <CopyIconButton text={jqUserManualLink} message='Jq user manual link copied to clipboard.' color='primary' tooltipText='Copy the jq user manual link to the clipboard.' />
                </InlineWrapper>
            </section>

            <section>
                <Typography gutterBottom sx={{ mt: 2 }}>Example of a jq predicate expression matching all messages with a Facility property with a value of 220:</Typography>

                <InlineWrapper>
                    <Typography>{facilityFilteringExample}</Typography>
                    <CopyIconButton text={facilityFilteringExample} message='Sample jq predicate expression copied to clipboard.' tooltipText='Copy the sample jq predicate expression to the clipboard.' />
                </InlineWrapper>
            </section>

            <Input id='jqFilter' label='jq predicate' isFullWidth multiline rows={3} sx={{ mt: 2 }} />
        </ContentWithSubtitle>
    );
};
