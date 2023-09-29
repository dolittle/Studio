// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { useConnectionsGet, useConnectionsIdPost } from '../../apis/integrations/connectionsApi.hooks';

import { Page } from '../../layout/page';
import { NoConnections } from './noConnections';
import { ConnectionsTable } from './connectionsTable';
import { CreateConnectionButton } from './createConnectionButton';

const getSuggestedIdFromRelHref = (href: string | null | undefined) => {
    if (!href) return href;

    const id = href.split('/').pop();
    return id;
};

export const Connections = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useConnectionsGet();
    const mutation = useConnectionsIdPost();

    const connections = data?.value || [];
    let newConnectionId: string | null | undefined;

    if (data && data.links?.some(link => link.rel === 'register')) {
        const registerRel = data.links?.find(link => link.rel === 'register');
        newConnectionId = getSuggestedIdFromRelHref(registerRel?.href);
    }

    const handleCreateNew = () => {
        if (!newConnectionId) {
            enqueueSnackbar('Could not create new connection at this time.', { variant: 'error' });
            return;
        }

        mutation.mutate(
            { id: newConnectionId }, {
            onSuccess: () => {
                //TODO: Move the generating of this url to a "well-known" place.
                const href = `${newConnectionId}`;
                enqueueSnackbar(`Connection '${newConnectionId}' created.`);
                navigate(href);
            },
            onError: () => {
                enqueueSnackbar('Could not create new connection at this time.', { variant: 'error' });
            },
        });
    };

    return (
        <Page title='Connections' sx={{ mb: 4 }}>
            {isError
                ? `We can't show your connections at this time. Please try again later.`
                : isLoading || connections.length
                    ? (
                        <>
                            <ConnectionsTable connections={connections} isLoading={isLoading} />
                            <CreateConnectionButton onClick={() => handleCreateNew()} buttonProps={{ disabled: isLoading }} />
                        </>
                    ) : (
                        <NoConnections onCreateNew={() => handleCreateNew()} />
                    )
            }
        </Page>
    );
};
