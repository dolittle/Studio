// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

import { NoContentSection } from '@dolittle/design-system';

import { useConnectionsIdRestApiEnablePost } from '../../../../../../apis/integrations/connectionRestApiApi.hooks';
import { CACHE_KEYS } from '../../../../../../apis/integrations/CacheKeys';

export type EnableRestApiSectionProps = {
    connectionId: string;
    isDisabled: boolean;
};

export const EnableRestApiSection = ({ connectionId, isDisabled }: EnableRestApiSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const enableMutation = useConnectionsIdRestApiEnablePost();

    const handleEnableRestApi = () => {
        enableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionRestApiStatus_GET, connectionId]);
                enqueueSnackbar('Rest API service is being deployed. You will be able to access it in a few minutes.');
            },
            onError: error => {
                enqueueSnackbar('Something went wrong deploying the Rest API service. Error: ' + error, { variant: 'error' });
            },
        });
    };

    return (
        <NoContentSection
            title='Rest API is not enabled yet...'
            description={`To enable the Rest API service, press the 'Enable REST API' button. The first time you enable the Rest API may take a few minutes to set up and deploy your dedicated service.`}
            label='Enable Rest API'
            icon='RocketLaunch'
            isDisabled={isDisabled}
            onCreate={handleEnableRestApi}
        />
    );
};
