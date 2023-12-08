// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Typography } from '@mui/material';

import { Button, ContentHeader } from '@dolittle/design-system';

import { useConnectionsIdRestApiStatusGet } from '../../../../../../apis/integrations/connectionRestApiApi.hooks';

import { DisableRestApiDialog } from './DisableRestApiDialog';

import { getIndicatorStatusFromStatusMessage } from '../../../../../statusHelpers';

export type HeaderSectionProps = {
    connectionId: string;
};

export const HeaderSection = ({ connectionId }: HeaderSectionProps) => {
    const [isDisableRestApiDialogOpen, setIsDisableRestApiDialogOpen] = useState(false);

    const { data: apiStatus, isLoading } = useConnectionsIdRestApiStatusGet({ id: connectionId },
        {
            refetchInterval: data => {
                const workInProgress = data?.service === 'Deploying' || data?.service === 'Terminating';
                return workInProgress ? 10000 : false;
            },
        },
    );

    const showDisableButton = apiStatus?.target !== 'Disabled';
    const serviceStatus = apiStatus?.service || 'Off';
    const shouldDisableDisableButton = serviceStatus === 'Off' || serviceStatus === 'Deploying' || serviceStatus === 'Terminating';

    const serviceStatusIndicator = getIndicatorStatusFromStatusMessage(apiStatus?.status);

    return (
        <>
            <DisableRestApiDialog isOpen={isDisableRestApiDialogOpen} onCancel={() => setIsDisableRestApiDialogOpen(false)} />

            <ContentHeader
                title='REST API'
                status={!isLoading && serviceStatusIndicator
                    ? {
                        status: serviceStatusIndicator.status,
                        label: serviceStatusIndicator.label,
                        message: serviceStatusIndicator.message,
                    }
                    : undefined
                }
                buttonsSlot={showDisableButton &&
                    <Button
                        label='Disable Rest API'
                        variant='outlined'
                        color='error'
                        disabled={shouldDisableDisableButton}
                        onClick={() => setIsDisableRestApiDialogOpen(true)}
                    />
                }
            />

            <Typography>
                The Rest API service exposes the message types for the connector to be consumed in external applications and services.
                The API is fully documented using OpenAPI specifications and will reflect the message types set up for the connector.
            </Typography>
        </>
    );
};
