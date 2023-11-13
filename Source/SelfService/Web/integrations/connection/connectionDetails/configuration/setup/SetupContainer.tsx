// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { Collapse } from '@mui/material';

import { ContentContainer, ContentHeader, ContentSection, FileUploadFormRef, LoadingSpinner } from '@dolittle/design-system';

import { useConnectionsIdGet, useConnectionsIdDelete } from '../../../../../apis/integrations/connectionsApi.hooks';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { M3SetupForm, M3SetupFormRef, M3SetupFormSaveState } from './M3SetupForm';
import { MainM3ConnectionInfo } from './MainM3ConnectionInfo';
import { ActionToolbar } from './ActionToolbar';
import { SetupFormContent } from './SetupFormContent';
import { M3AuthenticationType } from './M3AuthenticationType';

export const SetupContainer = () => {
    const [canEdit, setEditMode] = useState(false);
    const [alwaysEdit, setAlwaysEdit] = useState(false);
    const [lastSaveState, setLastSaveState] = useState<M3SetupFormSaveState>();
    const [authenticationType, setAuthenticationType] = useState<M3AuthenticationType>();
    const connectionId = useConnectionIdFromRoute();
    const query = useConnectionsIdGet(
        { id: connectionId },
        {
            refetchInterval: (data) => data?.value?.status.name !== 'Connected' ? 5000 : 8000,
            refetchOnWindowFocus: false,
        }
    );

    const formRef = useRef<M3SetupFormRef>(null);
    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const deleteMutation = useConnectionsIdDelete();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const connection = query.data?.value;
    const links = query.data?.links || [];

    const deploymentType = connection?.chosenEnvironment?.value;
    const hasSavedDeploymentType = deploymentType?.toLowerCase() !== 'unknown';

    const canConfigureConnection = authenticationType && connection?.status?.name !== 'Registered';

    useEffect(() => {
        if (!connection) {
            return;
        }

        const connectionStatus = connection.status.name.toLowerCase();

        if (connectionStatus === 'registered') {
            setAlwaysEdit(true);
        }
        if (connectionStatus === 'pending') {
            setAlwaysEdit(false);
        }
        if (connectionStatus === 'pending' || connectionStatus === 'registered') {
            setEditMode(true);
        };

    }, [connection?.status.name]);

    useEffect(() => {
        if (!connection || !connection.chosenEnvironment.value) {
            return;
        }
        let authenticationFromServer: M3AuthenticationType | undefined;
        if (connection._configuration.m3BasicAuth?.host) {
            authenticationFromServer = 'basic';
        }
        if (connection._configuration.ion?.gatewayUrl) {
            authenticationFromServer = 'ion';
        }

        const shouldOverrideAuthenticationFromServer = authenticationFromServer && !authenticationType;
        if (shouldOverrideAuthenticationFromServer) {
            setAuthenticationType(authenticationFromServer);
        }
    }, [
        connection?._configuration.ion,
        connection?._configuration.mdp,
        connection?._configuration.m3BasicAuth,
        connection?.chosenEnvironment.value
    ]);

    if (query.isLoading) return <LoadingSpinner />;
    if (!connection) return null;

    const handleDelete = () => {
        deleteMutation.mutate(
            { id: connectionId! },
            {
                onSuccess() {
                    queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connections_GET] });
                    enqueueSnackbar(`Deleted connection: ${connectionId}`);
                    navigate('/integrations/connections');
                },
                onError() {
                    enqueueSnackbar(`Error occurred when deleting connection: ${connectionId}`, { variant: 'error' });
                },
            },
        );
    };

    const handleSaveState = (saveState: M3SetupFormSaveState) => {
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

    const handleOnSaved = (saveState: M3SetupFormSaveState): void => {
        if (saveState.every((state) => state.status === 'success')) {
            fileUploadRef.current?.clearSelected();
            setEditMode(false);
        }
        handleSaveState(saveState);
    };

    const handleOnCancelAction = () => {
        formRef.current?.reset(true);
        setEditMode(false);
    };

    return (
        <ContentContainer>
            <M3SetupForm
                connectionId={connectionId}
                connection={connection}
                hasSelectedDeploymentType={hasSavedDeploymentType}
                authenticationType={authenticationType}
                onSaved={handleOnSaved}
                ref={formRef}
            >
                <ContentHeader
                    title='Connector Setup'
                    buttonsSlot={
                        <ActionToolbar
                            connectionId={connectionId}
                            connectorName={connection.name}
                            canEdit={canEdit}
                            onEditAction={() => setEditMode(true)}
                            onDeleteAction={handleDelete}
                            onCancelAction={handleOnCancelAction}
                            alwaysEdit={alwaysEdit}
                        />
                    }
                ></ContentHeader>
                <ContentSection hideHeader>

                    <MainM3ConnectionInfo
                        hasSavedDeploymentType={hasSavedDeploymentType}
                        connectionIdLinks={links}
                        canEdit={canEdit}
                        onAuthenticationTypeChange={setAuthenticationType} />

                    <Collapse in={canConfigureConnection}>
                        <SetupFormContent
                            connection={connection}
                            authenticationType={authenticationType}
                            canEdit={canEdit}
                            formSaveState={lastSaveState}
                            fileUploadRef={fileUploadRef} />
                    </Collapse>

                </ContentSection>
            </M3SetupForm>
        </ContentContainer>
    );
};
