// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { AccordionListProps, FileUploadFormRef } from '@dolittle/design-system';

import { ConnectionModel } from '../../../apis/integrations/generated';

import { ConnectorBundleConfiguration } from './ConnectorBundleConfiguration';
import { MetadataPublisherCredentials } from './MetadataPublisherCredentials';
import { IonServiceAccountCredentials } from './IonServiceAccountCredentials';
import { configurationStatusFromServiceCredentialsStatus, hostBundleStatusFromServicesStatus } from './statusResolvers';

export function useBuildConfigurationAccordionList(connection: ConnectionModel | undefined, fileUploadRef: React.RefObject<FileUploadFormRef>, canEdit: boolean = true): AccordionListProps {
    return useMemo(() => {
        const connectorBundleStatus = hostBundleStatusFromServicesStatus(connection?.mdpStatus, connection?.ionStatus);
        const metadataPublisherCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.mdpStatus);
        const iONServiceAccountCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.ionStatus);

        return {
            singleExpandMode: true,
            items: [
                {
                    id: 'hostConnectorBundle',
                    title: 'Host Your Connector Bundle',
                    children: <ConnectorBundleConfiguration connectionId={connection?.connectionId || ''} />,
                    progressStatus: connectorBundleStatus[0],
                    progressLabel: connectorBundleStatus[1],
                    sx: { mt: 8 },
                },
                {
                    id: 'metadataPublisherCredentials',
                    title: 'Metadata Publisher Credentials',
                    children: <MetadataPublisherCredentials canEdit={canEdit} />,
                    progressStatus: metadataPublisherCredentialsStatus && metadataPublisherCredentialsStatus[0],
                    progressLabel: metadataPublisherCredentialsStatus && metadataPublisherCredentialsStatus[1],
                    sx: { mt: 8 },
                },
                {
                    id: 'ionCredentials',
                    title: 'ION Service Account Credentials',
                    children: <IonServiceAccountCredentials ref={fileUploadRef} canEdit={canEdit} />,
                    progressStatus: iONServiceAccountCredentialsStatus && iONServiceAccountCredentialsStatus[0],
                    progressLabel: iONServiceAccountCredentialsStatus && iONServiceAccountCredentialsStatus[1],
                    sx: { mt: 8 },
                },
            ],
        };
    }, [connection?.status, connection?.ionStatus, connection?.mdpStatus, canEdit]);
}
