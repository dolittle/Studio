// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { ContentContainer, ContentHeader } from '@dolittle/design-system';
import { useConnectionsIdGet } from '../../../../../apis/integrations/connectionsApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { ActionToolbar } from './ActionToolbar';
import { RealtimeSyncSection } from './RealtimeSyncSection';


export const DataSyncConfigurationContainer = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [canEdit, setEditMode] = useState(false);
    const connectionId = useConnectionIdFromRoute();
    const query = useConnectionsIdGet({ id: connectionId });


    const connection = query.data?.value;
    const links = query.data?.links || [];

    const handleOnCancelAction = () => {
        setEditMode(false);
    };


    if (query.isLoading) return <>Loading</>;
    if (!connection) return null;

    return (
        <ContentContainer>
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
            {/* <ContentSection title='Scheduled Updates'>
                <ContentParagraph>
                Insert text here!
                </ContentParagraph>
            </ContentSection> */}
            <RealtimeSyncSection />
        </ContentContainer>
    );
};
