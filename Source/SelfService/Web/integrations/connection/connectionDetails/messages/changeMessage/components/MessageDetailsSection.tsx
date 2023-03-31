// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import { Input } from '@dolittle/design-system';

import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';

export type MessageDetailsSectionProps = ViewModeProps & {

};

export const MessageDetailsSection = (props: MessageDetailsSectionProps) => {
    return (
        <ContentSection hideHeader>
            <Grid container gap={12}>
                <Stack spacing={3}>
                    <Typography variant='subtitle2'>Provide a name for your message type</Typography>
                    <Input id='messageTypeName' label='Message Type Name' required />
                </Stack>

                <Stack spacing={3}>
                    <Typography variant='subtitle2'>Add a description for this message type</Typography>
                    <Input id='messageTypeDescription' label='Message Type Description' required />
                </Stack>
            </Grid>
        </ContentSection>
    );
};
