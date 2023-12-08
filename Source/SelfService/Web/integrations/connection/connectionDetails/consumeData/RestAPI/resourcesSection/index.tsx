// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ContentWithSubtitle } from '@dolittle/design-system';

import { useConnectionsIdRestApiStatusGet } from '../../../../../../apis/integrations/connectionRestApiApi.hooks';

import { DisabledRestApiView } from './DisabledRestApiView';
import { ActiveRestApiView } from './ActiveRestApiView';

export type AccessIndexProps = {
    connectionId: string;
};

/* The ERP ReadModels -service must be specific to the connection, so we need
    to generate the URL dynamically. */

export const ResourcesSection = ({ connectionId }: AccessIndexProps) => {
    const { data: apiStatus } = useConnectionsIdRestApiStatusGet({ id: connectionId });

    const serviceStatus = apiStatus?.service || 'Off';
    const isRestApiDisabled = apiStatus?.target === 'Disabled' || serviceStatus === 'Deploying';
    const isEnableRestApiBtnDisabled = serviceStatus === 'Deploying' || serviceStatus === 'Terminating';

    return (
        <ContentWithSubtitle title='Resources' infoTooltipLabel='Our rest API is documented using OpenAPI.'>
            {isRestApiDisabled
                ? <DisabledRestApiView connectionId={connectionId} isDisabled={isEnableRestApiBtnDisabled} />
                : <ActiveRestApiView restApiBaseUrl={apiStatus?.basePath || ''} />
            }
        </ContentWithSubtitle>
    );
};
