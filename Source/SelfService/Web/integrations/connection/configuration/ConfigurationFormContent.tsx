// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect, useMemo } from 'react';

import { AccordionList, AccordionListItem, AccordionListProps, AccordionProps, FileUploadFormRef } from '@dolittle/design-system';

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

    const [expanded, setExpanded] = useState<string[]>([]);
    const hasFormErrors = formSaveState?.some(s => s.status === 'error');

    const connectorBundleAccordionId = 'hostConnectorBundle';
    const mdpCredentialsAccordionId = 'metadataPublisherCredentials';
    const ionServiceAccountAccordionId = 'ION Service Account Credentials';

    const accordionListItems = useMemo(() => {
        const connectorBundleStatus = hostBundleStatusFromServicesStatus(connection?.mdpStatus, connection?.ionStatus);
        const metadataPublisherCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.mdpStatus);
        const iONServiceAccountCredentialsStatus = configurationStatusFromServiceCredentialsStatus(connection?.ionStatus);

        const items: AccordionListItem[] = [];
        if (connection?.chosenEnvironment.value?.toLocaleLowerCase() === 'on premises') {
            items.push(
                {
                    id: connectorBundleAccordionId,
                    title: 'Host Your Connector Bundle',
                    children: <ConnectorBundleConfiguration connectionId={connection?.connectionId || ''} />,
                    progressStatus: connectorBundleStatus[0],
                    progressLabel: connectorBundleStatus[1],
                    sx: { mt: 8 },
                }
            );
        }
        items.push(...[
            {
                id: mdpCredentialsAccordionId,
                title: 'Metadata Publisher Credentials',
                children: <MetadataPublisherCredentials canEdit={canEdit} />,
                progressStatus: metadataPublisherCredentialsStatus && metadataPublisherCredentialsStatus[0],
                progressLabel: metadataPublisherCredentialsStatus && metadataPublisherCredentialsStatus[1],
                sx: { mt: 8 },
            },
            {
                id: 'ionCredentials',
                title: ionServiceAccountAccordionId,
                children: <IonServiceAccountCredentials ref={fileUploadRef} canEdit={canEdit} />,
                progressStatus: iONServiceAccountCredentialsStatus && iONServiceAccountCredentialsStatus[0],
                progressLabel: iONServiceAccountCredentialsStatus && iONServiceAccountCredentialsStatus[1],
                sx: { mt: 8 },
            },]);
        return items;
    }, [
        connection?.chosenEnvironment.value,
        connection?.status,
        connection?.ionStatus,
        connection?.mdpStatus,
        canEdit,
        formSaveState
    ]);

    const getSaveStateFor = (name: SaveActionName) => formSaveState?.find(state => state.name === name);

    useEffect(() => {
        const mdpSaveState = getSaveStateFor('MDP configuration');
        const ionSaveState = getSaveStateFor('ION Configuration');

        const newExpanded = [...expanded];
        if (mdpSaveState?.status === 'error') {
            newExpanded.push(mdpCredentialsAccordionId);
        } else if (mdpSaveState?.status === 'success') {
            const index = newExpanded.indexOf(mdpCredentialsAccordionId);
            if (index > -1) {
                newExpanded.splice(index, 1);
            }
        }

        if (ionSaveState?.status === 'error') {
            newExpanded.push(ionServiceAccountAccordionId);
        } else if (ionSaveState?.status === 'success') {
            const index = newExpanded.indexOf(ionServiceAccountAccordionId);
            if (index > -1) {
                newExpanded.splice(index, 1);
            }
        }

        setExpanded([...new Set([...newExpanded])]);
    }, [formSaveState]);

    return <AccordionList items={accordionListItems} singleExpandMode={!hasFormErrors} expandedModel={expanded} onExpandedModelChange={setExpanded} />;
};
