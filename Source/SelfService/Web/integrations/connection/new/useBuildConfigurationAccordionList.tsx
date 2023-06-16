// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { AccordionListProps, FileUploadFormRef } from '@dolittle/design-system';

import { ConnectionModel } from '../../../apis/integrations/generated';

import { ConnectorBundleConfiguration } from './components/ConnectorBundleConfiguration';
import { MetadataPublisherCredentials } from './components/MetadataPublisherCredentials';
import { IonServiceAccountCredentials } from './components/IonServiceAccountCredentials';
import { configurationStatusFromServiceCredentialsStatus, hostBundleStatusFromServicesStatus } from '../configuration/statusResolvers';

export function useBuildConfigurationAccordionList(connection: ConnectionModel | undefined, fileUploadRef: React.RefObject<FileUploadFormRef>): AccordionListProps {
    return useMemo(() => {
        const connectorBundleStatus = hostBundleStatusFromServicesStatus(connection?.mdpStatus, connection?.ionStatus);
        const metadataPublisherCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.mdpStatus);
        const iONServiceAccountCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.ionStatus);
        const disabled = connection?.status?.name === 'Registered';

        return {
            singleExpandMode: true,
            items: [
                {
                    id: 'hostConnectorBundle',
                    title: 'Host Your Connector Bundle',
                    children: <ConnectorBundleConfiguration />,
                    progressStatus: connectorBundleStatus[0],
                    progressLabel: connectorBundleStatus[1],
                    disabled,
                    sx: { mt: 8 },
                },
                {
                    id: 'metadataPublisherCredentials',
                    title: 'Metadata Publisher Credentials',
                    children: <MetadataPublisherCredentials />,
                    progressStatus: metadataPublisherCredentialsStatus[0],
                    progressLabel: metadataPublisherCredentialsStatus[1],
                    disabled,
                    sx: { mt: 8 },
                },
                {
                    id: 'ionCredentials',
                    title: 'ION Service Account Credentials',
                    children: <IonServiceAccountCredentials ref={fileUploadRef} />,
                    progressStatus: iONServiceAccountCredentialsStatus[0],
                    progressLabel: iONServiceAccountCredentialsStatus[1],
                    disabled,
                    sx: { mt: 8 },
                },
            ],
        };
    }, [connection?.status, connection?.ionStatus, connection?.mdpStatus]);
}
