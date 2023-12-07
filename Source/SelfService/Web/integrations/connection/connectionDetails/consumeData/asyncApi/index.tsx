// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentContainer } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { HeaderSection } from './HeaderSection';
import { ResourcesSection } from './ResourcesSection';
import { ServiceAccountsSection } from './serviceAccountsSection';

export const AsyncApiContainer = () => {
    const connectionId = useConnectionIdFromRoute();

    return (
        <ContentContainer>
            <HeaderSection />
            <ResourcesSection connectionId={connectionId} />
            <ServiceAccountsSection connectionId={connectionId} />
        </ContentContainer>
    );
};
