// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useState } from 'react';

import { useSnackbar } from 'notistack';

import { ContentContainer, ContentHeader } from '@dolittle/design-system/';

import { useConnectionsIdGet } from '../../../../../apis/integrations/connectionsApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { SettingsForm, SettingsFormRef, SettingsFormSaveState } from './SettingsForm';
import { SettingsFormContent } from './SettingsFormContent';
import { ActionToolbar } from './ActionToolbar';

export const SettingsContainer = () => {
    const [canEdit, setEditMode] = useState(false);
    //const [lastSaveState, setLastSaveState] = useState<SettingsFormSaveState>();

    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionIdFromRoute();
    const query = useConnectionsIdGet({ id: connectionId });

    const formRef = useRef<SettingsFormRef>(null);

    const connection = query.data?.value;
    //const links = query.data?.links || [];

    const handleSaveState = (saveState: SettingsFormSaveState) => {
        //setLastSaveState(saveState);
        saveState.forEach(state => {
            if (state.status === 'success') {
                enqueueSnackbar(`Saved ${state.name}.`);
            }
            if (state.status === 'error') {
                enqueueSnackbar(`Error saving ${state.name}. Error: ${state.errorMessage}`, { variant: 'error' });
            }
        });
    };

    const handleOnSaved = (saveState: SettingsFormSaveState): void => {
        if (saveState.every(state => state.status === 'success')) {
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
            <SettingsForm connectionId={connectionId} connection={connection} onSaved={handleOnSaved} ref={formRef}>
                <ContentHeader
                    title='General Settings'
                    buttonsSlot={
                        <ActionToolbar canEdit={canEdit} onCancelAction={handleOnCancelAction} onEditAction={() => setEditMode(true)} />
                    }
                />
                <SettingsFormContent canEdit={canEdit} />
            </SettingsForm>
        </ContentContainer>
    );
};
