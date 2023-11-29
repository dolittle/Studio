// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentContainer, ContentHeader, ContentParagraph } from '@dolittle/design-system';

import { SpecificationSection } from './SpecificationSection';
import { ResourcesSection } from './ResourcesSection';
import { ServiceAccountsSection } from './serviceAccountsSection';

export const ConsumeDataEventStreamsIndex = () =>
    <ContentContainer>
        <ContentHeader title='Async API' status={{ status: 'success', label: 'Active' }} />

        <ContentParagraph>
            Event streams expose message types for the connector to be consumed in external applications and services over Kafka.
            The event streams are fully documented using Async API specifications and will reflect the message types set up for the connector.
        </ContentParagraph>

        <SpecificationSection />

        <ResourcesSection />

        <ServiceAccountsSection />
    </ContentContainer>;
