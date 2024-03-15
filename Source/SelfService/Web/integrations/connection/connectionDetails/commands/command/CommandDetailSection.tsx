// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentWithSubtitle, InlineWrapper, Input } from '@dolittle/design-system';

import { alphaNumericCharsRegex } from '../../../../../utils/helpers/regex';

export type CommandDetailSectionProps = {
    isDisabled?: boolean;
};

export const CommandDetailSection = ({ isDisabled }: CommandDetailSectionProps) =>
    <ContentWithSubtitle title='Command details' infoTooltipLabel='Provide a name, namespace and description for your command. Command name is required.'>
        <InlineWrapper sx={{ alignItems: 'flex-start', gap: 4 }}>
            <Input id='commandName' label='Command name' required disabled={isDisabled} pattern={{ value: alphaNumericCharsRegex, message: 'Can only contain characters or numbers.' }} />
            <Input id='namespace' label='Namespace' />
            <Input id='description' label='Description' disabled={isDisabled} />
        </InlineWrapper>
    </ContentWithSubtitle>;
