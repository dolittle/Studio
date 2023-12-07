// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentContainer } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { AccessIndex } from './access';
import { CredentialsIndex } from './Credentials';
import { RestApiHeader } from './restApiHeader/RestAPIHeader';

export const RestAPIIndex = () => {
    const connectionId = useConnectionIdFromRoute();

    return (
        <ContentContainer>
            <RestApiHeader connectionId={connectionId} />
            <AccessIndex connectionId={connectionId} />
            <CredentialsIndex connectionId={connectionId} />
        </ContentContainer>
    );
};
