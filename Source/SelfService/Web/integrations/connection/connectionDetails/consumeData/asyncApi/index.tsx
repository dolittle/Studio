// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentContainer } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { AsyncApiHeader } from './AsyncApiHeader';
import { ResourcesSection } from './ResourcesSection';
import { ServiceAccountsSection } from './serviceAccountsSection';

export const AsyncApiContainer = () => {
    const connectionId = useConnectionIdFromRoute();

    return (
        <ContentContainer>
            <AsyncApiHeader />
            <ResourcesSection connectionId={connectionId} />
            <ServiceAccountsSection connectionId={connectionId} />
        </ContentContainer>
    );
};
