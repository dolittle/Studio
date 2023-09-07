// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { ContentContainer, ContentHeader, ContentParagraph, ContentSection } from '@dolittle/design-system';
import { useConnectionsIdGet } from '../../../../../apis/integrations/connectionsApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { ActionToolbar } from './ActionToolbar';
import { RealtimeSyncSection } from './RealtimeSyncSection';
import { ScheduledSyncSection } from './ScheduledSyncSection';
import { DataSyncForm, DataSyncFormRef, DataSyncFormSaveState } from './DataSyncForm';


export const DataSyncConfigurationContainer = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [canEdit, setEditMode] = useState(false);
    const [lastSaveState, setLastSaveState] = useState<DataSyncFormSaveState>();
    const formRef = useRef<DataSyncFormRef>(null);

    const connectionId = useConnectionIdFromRoute();
    const query = useConnectionsIdGet({ id: connectionId });


    const connection = query.data?.value;
    const links = query.data?.links || [];

    const handleOnCancelAction = () => {
        setEditMode(false);
    };

    const handleSaveState = (saveState: DataSyncFormSaveState) => {
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

    const handleOnSaved = (saveState: DataSyncFormSaveState): void => {
        if (saveState.every((state) => state.status === 'success')) {
            setEditMode(false);
        }
        handleSaveState(saveState);
    };


    if (query.isLoading) return <>Loading</>;
    if (!connection) return null;

    return (
        <ContentContainer>
            <DataSyncForm
                connectionId={connectionId}
                connection={connection}
                onSaved={handleOnSaved}
                ref={formRef}
            >

                <ContentHeader
                    title='Data Sync Settings'
                    buttonsSlot={
                        <ActionToolbar
                            canEdit={canEdit}
                            onCancelAction={handleOnCancelAction}
                            onEditAction={() => setEditMode(true)}
                        />
                    }
                />
                <ScheduledSyncSection canEdit={canEdit} />
                <RealtimeSyncSection />
            </DataSyncForm>
        </ContentContainer>
    );
};
