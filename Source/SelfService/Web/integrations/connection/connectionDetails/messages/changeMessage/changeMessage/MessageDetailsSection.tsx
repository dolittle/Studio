// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentWithSubtitle, InlineWrapper, Input } from '@dolittle/design-system';

import { alphaNumericCharsRegex } from '../../../../../../utils/helpers/regex';

export const MessageDetailsSection = () =>
    <ContentWithSubtitle title='Message Type name and description' infoTooltipLabel='Provide a name and description for your Message Type. Name is required.'>
        <InlineWrapper sx={{ gap: 2 }}>
            <Input id='name' label='Message Type Name' required pattern={{ value: alphaNumericCharsRegex, message: 'Can only contain characters or numbers' }} />
            <Input id='description' label='Message Type Description' />
        </InlineWrapper>
    </ContentWithSubtitle>;
