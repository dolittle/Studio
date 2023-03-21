// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

import { NoConnections } from './noConnections';
import { Page } from '../../components/layout/page';
import { ConnectionsTable } from './connectionsTable';
import { useConnectionsGet, useConnectionsIdPost } from '../../apis/integrations/connectionsApi.hooks';
import { CreateConnectionButton } from './createConnectionButton';

export const Connections = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { applicationId } = useParams();
    const { data, isLoading, isFetching, isError, error } = useConnectionsGet();
    const mutation = useConnectionsIdPost();
    const connections = data?.value || [];
    let newConnectionId: string | null | undefined;

    if (data && data.links?.some(link => link.rel === 'register')) {
        const registerRel = data.links?.find(link => link.rel === 'register');
        newConnectionId = getSuggestedIdFromRelHref(registerRel?.href);
    }

    const handleCreateNew = () => {
        if (!newConnectionId) {
            enqueueSnackbar('Could not create new connection at this time', { variant: 'error' });
            return;
        }
        console.log('mutating', newConnectionId);
        mutation.mutate(
            { id: newConnectionId }, {
            onSuccess: (result) => {
                //TODO: Move the generating of this url to a "well-known" place
                const href = `new/m3/${newConnectionId}/`;
                enqueueSnackbar('Connection created', {variant: 'success'});
                navigate(href);
            },
            onError: (error) => {
                enqueueSnackbar('Could not create new connection at this time', {variant: 'error'});
                console.log('Error creating connection', error);
            }
        });
    };

    return (
        <Page title='Connections'>
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

function getSuggestedIdFromRelHref(href: string | null | undefined) {
    if (!href) {
        return href;
    }
    const id = href.split('/').pop();
    return id;
}
