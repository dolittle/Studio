// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { ContentContainer, ContentHeader, ContentSection, ContentParagraph, ContentDivider } from '@dolittle/design-system/';
import { useConnectionsIdGet } from '../../../../../apis/integrations/connectionsApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { ExporterConfigurationSection } from './ExporterConfigurationSection';
import { ConnectorConfigurationForm, ConnectorConfigurationFormRef, ConnectorConfigurationFormSaveState } from './ConnectorConfigurationForm';
import { ActionToolbar } from './ActionToolbar';

export const ConfigurationContainer = () => {
    const [canEdit, setEditMode] = useState(false);
    const [lastSaveState, setLastSaveState] = useState<ConnectorConfigurationFormSaveState>();

    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionIdFromRoute();
    const query = useConnectionsIdGet({ id: connectionId });

    const formRef = useRef<ConnectorConfigurationFormRef>(null);

    const connection = query.data?.value;
    const links = query.data?.links || [];

    const handleSaveState = (saveState: ConnectorConfigurationFormSaveState) => {
        setLastSaveState(saveState);
        saveState.forEach((state) => {
            if (state.status === 'success') {
                enqueueSnackbar(`Saved ${state.name}`);
            }
            if (state.status === 'error') {
                enqueueSnackbar(`Error saving ${state.name}. Error: ${state.errorMessage}`, { variant: 'error' });
            }
        });
    };

    const handleOnSaved = (saveState: ConnectorConfigurationFormSaveState): void => {
        console.log('saved');

        if (saveState.every((state) => state.status === 'success')) {
            setEditMode(false);
        }
        handleSaveState(saveState);
    };

    const handleOnCancelAction = () => {
        formRef.current?.reset(true);
        setEditMode(false);
    };

    if (query.isLoading) return <>Loading</>;
    if (!connection) return null;

    return (
        <ContentContainer>
            <ConnectorConfigurationForm
                connectionId={connectionId}
                connection={connection}
                onSaved={handleOnSaved}
                ref={formRef}
            >
                <ContentHeader
                    title='Connector Configuration'
                    buttonsSlot={
                        <ActionToolbar
                            canEdit={canEdit}
                            onCancelAction={handleOnCancelAction}
                            onEditAction={() => setEditMode(true)}
                        />
                    }
                />
                <ExporterConfigurationSection canEdit={canEdit} />
            </ConnectorConfigurationForm>
        </ContentContainer>
    );
};
