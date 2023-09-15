// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect, useMemo } from 'react';

import { AccordionList, AccordionListItem, FileUploadFormRef } from '@dolittle/design-system';

import { ConnectionModel } from '../../../../../apis/integrations/generated';
import { getIndicatorStatusFromStatusMessage } from '../../../../statusHelpers';

import { ConnectorBundleConfiguration } from './ConnectorBundleConfiguration';
import { MetadataPublisherCredentials } from './MetadataPublisherCredentials';
import { IonServiceAccountCredentials } from './IonServiceAccountCredentials';
import { hostBundleStatusFromServicesStatus } from './statusResolvers';
import { M3SetupFormSaveState, SaveActionName } from './M3SetupForm';
import { M3AuthenticationType } from './M3AuthenticationType';
import { M3BasicAuthenticationCredentials } from './M3BasicAuthenticationCredentials';

export type SetupFormContentProps = {
    connection: ConnectionModel | undefined;
    fileUploadRef: React.RefObject<FileUploadFormRef>;
    canEdit: boolean;
    authenticationType?: M3AuthenticationType;
    formSaveState?: M3SetupFormSaveState;
};

export const SetupFormContent = ({
    connection,
    fileUploadRef,
    canEdit = true,
    formSaveState,
    authenticationType
}: SetupFormContentProps) => {

    const [expanded, setExpanded] = useState<string[]>([]);
    const hasFormErrors = formSaveState?.some(s => s.status === 'error');

    const connectorBundleAccordionId = 'hostConnectorBundle';
    const mdpCredentialsAccordionId = 'metadataPublisherCredentials';
    const ionServiceAccountAccordionId = 'ionCredentials';
    const basicCredentialsAccordionId = 'basicCredentials';

    const accordionListItems = useMemo(() => {
        const connectorBundleStatus = hostBundleStatusFromServicesStatus(connection?.mdpStatus, connection?.ionStatus);
        const metadataPublisherCredentialsStatus = getIndicatorStatusFromStatusMessage(connection?.mdpCredentialStatus.statusMessage);
        const iONServiceAccountCredentialsStatus = getIndicatorStatusFromStatusMessage(connection?.m3CredentialStatus.statusMessage);
        const basicAuthenticationCredentialsStatus = getIndicatorStatusFromStatusMessage(connection?.m3CredentialStatus.statusMessage);

        const items: AccordionListItem[] = [];
        const connectorBundleAccordion: AccordionListItem = {
            id: connectorBundleAccordionId,
            title: 'Host Your Connector Bundle',
            children: <ConnectorBundleConfiguration connectionId={connection?.connectionId || ''} />,
            statusLevel: connectorBundleStatus[0],
            statusLabel: connectorBundleStatus[1],
            sx: { mt: 8 },
        };
        const mdpCredentialsAccordion: AccordionListItem = {
            id: mdpCredentialsAccordionId,
            title: 'Metadata Publisher Credentials',
            children: <MetadataPublisherCredentials canEdit={canEdit} />,
            statusLevel: metadataPublisherCredentialsStatus?.status,
            statusLabel: metadataPublisherCredentialsStatus?.label,
            statusMessage: metadataPublisherCredentialsStatus?.message,
            sx: { mt: 8 },
        };
        const ionCredentialsAccordion: AccordionListItem = {
            id: ionServiceAccountAccordionId,
            title: 'ION Service Account Credentials',
            children: <IonServiceAccountCredentials ref={fileUploadRef} canEdit={canEdit} />,
            statusLevel: iONServiceAccountCredentialsStatus?.status,
            statusLabel: iONServiceAccountCredentialsStatus?.label,
            statusMessage: iONServiceAccountCredentialsStatus?.message,
            sx: { mt: 8 },
        };
        const basicAuthenticationAccordion: AccordionListItem = {
            id: basicCredentialsAccordionId,
            title: 'M3 Basic Credentials',
            children: <M3BasicAuthenticationCredentials canEdit={canEdit} />,
            statusLevel: basicAuthenticationCredentialsStatus?.status,
            statusLabel: basicAuthenticationCredentialsStatus?.label,
            statusMessage: basicAuthenticationCredentialsStatus?.message ,
            sx: { mt: 8 },
        };

        if (connection?.chosenEnvironment.value?.toLocaleLowerCase() === 'on premises') {
            items.push(connectorBundleAccordion);
        }
        items.push(mdpCredentialsAccordion); // Always show MDP credentials for now, even though it's not required for M3 cloudsuite instances.
        if (authenticationType === 'ion') {
            items.push(ionCredentialsAccordion);
        }
        if (authenticationType === 'basic') {
            items.push(basicAuthenticationAccordion);
        }

        return items;
    }, [
        connection?.chosenEnvironment.value,
        connection?.status,
        connection?.m3CredentialStatus,
        connection?.mdpCredentialStatus,
        canEdit,
        formSaveState,
        authenticationType
    ]);

    const getSaveStateFor = (name: SaveActionName) => formSaveState?.find(state => state.name === name);

    useEffect(() => {
        const mdpSaveState = getSaveStateFor('MDP Configuration');
        const ionSaveState = getSaveStateFor('ION Configuration');
        const basicSaveState = getSaveStateFor('Basic Configuration');

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

        if (basicSaveState?.status === 'error') {
            newExpanded.push(basicCredentialsAccordionId);
        } else if (basicSaveState?.status === 'success') {
            const index = newExpanded.indexOf(basicCredentialsAccordionId);
            if (index > -1) {
                newExpanded.splice(index, 1);
            }
        }

        setExpanded([...new Set([...newExpanded])]);
    }, [formSaveState]);

    return <AccordionList items={accordionListItems} singleExpandMode={!hasFormErrors} expandedModel={expanded} onExpandedModelChange={setExpanded} />;
};
