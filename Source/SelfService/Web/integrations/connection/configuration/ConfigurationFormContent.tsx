// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { AccordionList, AccordionListProps, AccordionProps, FileUploadFormRef } from '@dolittle/design-system';

import { ConnectionModel } from '../../../apis/integrations/generated';

import { ConnectorBundleConfiguration } from './ConnectorBundleConfiguration';
import { MetadataPublisherCredentials } from './MetadataPublisherCredentials';
import { IonServiceAccountCredentials } from './IonServiceAccountCredentials';
import { configurationStatusFromServiceCredentialsStatus, hostBundleStatusFromServicesStatus } from './statusResolvers';
import { M3ConfigurationFormSaveState, SaveActionName } from './M3ConfigurationForm';

export type ConfigurationFormContentProps = {
    connection: ConnectionModel | undefined;
    fileUploadRef: React.RefObject<FileUploadFormRef>;
    canEdit: boolean;
    formSaveState?: M3ConfigurationFormSaveState;
};

export const ConfigurationFormContent = ({
    connection,
    fileUploadRef,
    canEdit = true,
    formSaveState
}: ConfigurationFormContentProps) => {

    const getSaveStateFor = (name: SaveActionName) => formSaveState?.find(state => state.name === name);

    const accordionListProps = useMemo(() => {
        const connectorBundleStatus = hostBundleStatusFromServicesStatus(connection?.mdpStatus, connection?.ionStatus);
        const metadataPublisherCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.mdpStatus);
        const iONServiceAccountCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.ionStatus);

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
        const expandMdp = mdpSaveState ? mdpSaveState.status === 'error' : false;
        const expandIon = ionSaveState ? ionSaveState.status === 'error' : false;
        console.log('expandMdp', expandMdp);
        console.log('expandIon', expandIon);
        items.push(...[
            {
                id: 'metadataPublisherCredentials',
                title: 'Metadata Publisher Credentials',
                children: <MetadataPublisherCredentials canEdit={canEdit} />,
                progressStatus: metadataPublisherCredentialsStatus && metadataPublisherCredentialsStatus[0],
                progressLabel: metadataPublisherCredentialsStatus && metadataPublisherCredentialsStatus[1],
                sx: { mt: 8 },
                defaultExpanded: expandMdp
            },
            {
                id: 'ionCredentials',
                title: 'ION Service Account Credentials',
                children: <IonServiceAccountCredentials ref={fileUploadRef} canEdit={canEdit} />,
                progressStatus: iONServiceAccountCredentialsStatus && iONServiceAccountCredentialsStatus[0],
                progressLabel: iONServiceAccountCredentialsStatus && iONServiceAccountCredentialsStatus[1],
                sx: { mt: 8 },
                defaultExpanded: expandIon,
            },]);
        return {
            singleExpandMode: false,
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

    return <AccordionList  {...accordionListProps} />;
};
