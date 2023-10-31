// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentWithSubtitle } from '@dolittle/design-system';

import { EnableRestApiSection } from './EnableRestApiSection';
import { RestApiDescriptionSection } from './RestApiDescriptionSection';

export type AccessIndexProps = {
    isApiDisabled: boolean;
    isButtonDisabled: boolean;
    restApiBaseUrl: string;
    onEnableRestApi: () => void;
};

export const AccessIndex = ({ isApiDisabled, isButtonDisabled, restApiBaseUrl, onEnableRestApi }: AccessIndexProps) =>
    <ContentWithSubtitle title='Access' infoTooltipLabel='Our rest API is documented using OpenAPI.'>
        {isApiDisabled
            ? <EnableRestApiSection onEnableRestApi={onEnableRestApi} disabled={isButtonDisabled} />
            : <RestApiDescriptionSection restApiBaseUrl={restApiBaseUrl} />
        }
    </ContentWithSubtitle>;
