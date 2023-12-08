// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentContainer } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { HeaderSection } from './headerSection';
import { ResourcesSection } from './resourcesSection';
import { CredentialsSection } from './credentialsSection';

export const RestApiContainer = () => {
    const connectionId = useConnectionIdFromRoute();

    return (
        <ContentContainer>
            <HeaderSection connectionId={connectionId} />
            <ResourcesSection connectionId={connectionId} />
            <CredentialsSection connectionId={connectionId} />
        </ContentContainer>
    );
};
