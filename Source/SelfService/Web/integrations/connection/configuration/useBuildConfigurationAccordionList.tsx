// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { AccordionListProps, AccordionProps, FileUploadFormRef } from '@dolittle/design-system';

import { ConnectionModel } from '../../../apis/integrations/generated';

import { ConnectorBundleConfiguration } from './ConnectorBundleConfiguration';
import { MetadataPublisherCredentials } from './MetadataPublisherCredentials';
import { IonServiceAccountCredentials } from './IonServiceAccountCredentials';
import { configurationStatusFromServiceCredentialsStatus, hostBundleStatusFromServicesStatus } from './statusResolvers';
import { M3ConfigurationFormSaveState, SaveActionName } from './M3ConfigurationForm';

export function useBuildConfigurationAccordionList(
    connection: ConnectionModel | undefined,
    fileUploadRef: React.RefObject<FileUploadFormRef>,
    canEdit: boolean = true,
    formSaveState?: M3ConfigurationFormSaveState
): AccordionListProps {
    return useMemo(() => {
        const connectorBundleStatus = hostBundleStatusFromServicesStatus(connection?.mdpStatus, connection?.ionStatus);
        const metadataPublisherCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.mdpStatus);
        const iONServiceAccountCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.ionStatus);

        const getSaveStateFor = (name: SaveActionName) => formSaveState?.find(state => state.name === name);
        const mdpSaveState = getSaveStateFor('MDP configuration');
        const ionSaveState = getSaveStateFor('ION Configuration');
        const items: AccordionProps[] = [];
        if (connection?.chosenEnvironment.value?.toLocaleLowerCase() === 'on premises') {
            items.push(
                {
                    id: 'hostConnectorBundle',
                    title: 'Host Your Connector Bundle',
                    children: <ConnectorBundleConfiguration connectionId={connection?.connectionId || ''} />,
                    progressStatus: connectorBundleStatus[0],
                    progressLabel: connectorBundleStatus[1],
                    sx: { mt: 8 },
                }
            );
        }
        const expandMdp = mdpSaveState ? mdpSaveState.status === 'error' : undefined;
        const expandIon = ionSaveState ? ionSaveState.status === 'error' : undefined;
        items.push(...[
            {
                id: 'metadataPublisherCredentials',
                title: 'Metadata Publisher Credentials',
                children: <MetadataPublisherCredentials canEdit={canEdit} />,
                progressStatus: metadataPublisherCredentialsStatus && metadataPublisherCredentialsStatus[0],
                progressLabel: metadataPublisherCredentialsStatus && metadataPublisherCredentialsStatus[1],
                sx: { mt: 8 },
                expanded: expandMdp
            },
            {
                id: 'ionCredentials',
                title: 'ION Service Account Credentials',
                children: <IonServiceAccountCredentials ref={fileUploadRef} canEdit={canEdit} />,
                progressStatus: iONServiceAccountCredentialsStatus && iONServiceAccountCredentialsStatus[0],
                progressLabel: iONServiceAccountCredentialsStatus && iONServiceAccountCredentialsStatus[1],
                sx: { mt: 8 },
                expanded: expandIon,
            },]);
        return {
            singleExpandMode: true,
            items
        };
    }, [
        connection?.chosenEnvironment.value,
        connection?.status,
        connection?.ionStatus,
        connection?.mdpStatus,
        canEdit,
        formSaveState
    ]);
};
