// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Button, ContentContainer, ContentHeader, ContentParagraph, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdRestApiStatusGet } from '../../../../apis/integrations/connectionRestApiApi.hooks';

import { useConnectionIdFromRoute } from '../../../routes.hooks';

import { AccessIndex } from './access';
import { CredentialsIndex } from './Credentials';
import { DisableRestApiDialog } from './DisableRestApiDialog';

import { getIndicatorStatusFromStatusMessage } from '../../../statusHelpers';

/* The ERP ReadModels -service must be specific to the connection, so we need
    to generate the URL dynamically. */

export const ConsumeDataRestAPIView = () => {
    const connectionId = useConnectionIdFromRoute();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const { data: apiStatus, isLoading } = useConnectionsIdRestApiStatusGet(
        { id: connectionId },
        {
            refetchInterval: data => {
                // This will reset the credentials dialog input fields.
                // As a workaround, we disabled the button while the service is deploying or terminating.
                const workInProgress = data?.service === 'Deploying' || data?.service === 'Terminating';
                return workInProgress ? 10000 : false;
            },
        },
    );

    const serviceStatus = apiStatus?.service || 'Off';
    const showEnableSection = (apiStatus?.target === 'Disabled') || serviceStatus === 'Deploying';
    const isButtonsDisabled = serviceStatus === 'Deploying' || serviceStatus === 'Terminating';
    const shouldDisableDisableButton = serviceStatus === 'Off' || serviceStatus === 'Deploying' || serviceStatus === 'Terminating';
    const serviceStatusIndicator = getIndicatorStatusFromStatusMessage(apiStatus?.status);

    if (isLoading) return <LoadingSpinner />;

    return (
        <ContentContainer>
            <DisableRestApiDialog isOpen={isDeleteDialogOpen} onCancel={() => setIsDeleteDialogOpen(false)} />

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
                buttonsSlot={
                    <>
                        {(!showEnableSection) &&
                            <Button
                                label='Disable Rest API'
                                variant='outlined'
                                color='error'
                                disabled={shouldDisableDisableButton}
                                onClick={() => setIsDeleteDialogOpen(true)}
                            />
                        }
                    </>
                }
            />

            <ContentParagraph>
                The Rest API service exposes the message types for the connector to be consumed in external applications and services.
                The API is fully documented using OpenAPI specifications and will reflect the message types set up for the connector.
            </ContentParagraph>

            <AccessIndex isApiDisabled={showEnableSection} isButtonDisabled={isButtonsDisabled} restApiBaseUrl={apiStatus?.basePath || ''} />
            <CredentialsIndex isButtonDisabled={isButtonsDisabled} />
        </ContentContainer>
    );
};
