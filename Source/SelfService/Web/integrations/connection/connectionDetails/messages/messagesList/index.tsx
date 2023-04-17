// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { useConnectionId } from '../../../../routes.hooks';

import { AlertBox, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsGet } from '../../../../../apis/integrations/messageMappingApi.hooks';

import { MessagesTable } from './MessagesTable';
import { CreateMessagesButton } from './CreateMessagesButton';
import { NoMessages } from './NoMessages';
import { defaultEmptyDate } from './helpers';

export const MessagesListView = () => {
    const connectionId = useConnectionId();
    const navigate = useNavigate();

    const { data, isError, isLoading } = useConnectionsIdMessageMappingsGet({ id: connectionId || '' });

    const handleCreateNewMessage = () => {
        navigate('new');
    };


    const messageTypesRows = useMemo(() => {
        const mappedRows = data?.value?.map(mapping => ({
            id: mapping.id!,
            ...mapping
        })) || [];

        const sortedRows = mappedRows.sort((a, b) => {
            return a.deployedAt?.toISOString() === defaultEmptyDate.toISOString()
                ? 1
                : -1;
        });
        return sortedRows;
    }, [data?.value]);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <AlertBox />;

    return (
        messageTypesRows.length ?
            <>
                <MessagesTable rows={messageTypesRows} />
                <CreateMessagesButton onClick={() => { handleCreateNewMessage(); }} />
            </> :
            <NoMessages onCreateNew={() => { handleCreateNewMessage(); }} />
    );
};
