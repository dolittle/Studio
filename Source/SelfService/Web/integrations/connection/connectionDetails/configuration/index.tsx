// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { Box, Collapse, Typography } from '@mui/material';

import { AccordionListProps, FileUploadFormRef } from '@dolittle/design-system';

import { useConnectionsIdGet, useConnectionsIdDelete } from '../../../../apis/integrations/connectionsApi.hooks';
import { CACHE_KEYS } from '../../../../apis/integrations/CacheKeys';
import { getConnectionIndicatorStatus } from '../../../../utils/helpers';
import { useConnectionIdFromRoute } from '../../../routes.hooks';
import { M3ConfigurationForm, M3ConfigurationFormRef, M3ConfigurationFormSaveState } from '../../configuration/M3ConfigurationForm';
import { MainM3ConnectionInfo } from '../../configuration/MainM3ConnectionInfo';
import { ActionToolbar } from './ActionToolbar';
import { ConfigurationFormContent } from '../../configuration/ConfigurationFormContent';

export const ConfigurationView = () => {
    const [canEdit, setEditMode] = useState(false);
    const [alwaysEdit, setAlwaysEdit] = useState(false);
    const [lastSaveState, setLastSaveState] = useState<M3ConfigurationFormSaveState>();
    const connectionId = useConnectionIdFromRoute();
    const query = useConnectionsIdGet(
        { id: connectionId },
        {
            refetchInterval: (data) => data?.value?.status.name !== 'Connected' ? 5000 : false,
            refetchOnWindowFocus: false,
        }
    );

    const formRef = useRef<M3ConfigurationFormRef>(null);
    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const deleteMutation = useConnectionsIdDelete();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const connection = query.data?.value;
    const links = query.data?.links || [];

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
        if (getConnectionIndicatorStatus(connection.status.name).label === 'pending') {
            setEditMode(true);
        };

    }, [connection?.status.name]);

    const deploymentType = connection?.chosenEnvironment?.value;
    const hasSelectedDeploymentType = deploymentType?.toLowerCase() !== 'unknown';

    const canConfigureConnection = connection?.status?.name !== 'Registered';


    if (query.isLoading) return <>Loading</>;
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

    const handleSaveState = (saveState: M3ConfigurationFormSaveState) => {
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

    return (
        <Box sx={{ mt: 6, ml: 2 }}>
            <Typography variant='subtitle1'>Configuration Setup</Typography>

            <M3ConfigurationForm
                connectionId={connectionId}
                connection={connection}
                hasSelectedDeploymentType={hasSelectedDeploymentType}
                onSaved={(saveState) => {
                    fileUploadRef.current?.clearSelected();
                    setEditMode(false);
                    handleSaveState(saveState);
                }}
                ref={formRef}
            >
                <ActionToolbar
                    connectionId={connectionId}
                    connectorName={connection.name}
                    canEdit={canEdit}
                    onEditAction={() => setEditMode(true)}
                    onDeleteAction={handleDelete}
                    onCancelAction={() => {
                        formRef.current?.reset(true);
                        setEditMode(false);
                    }}
                    alwaysEdit={alwaysEdit}
                />

                <MainM3ConnectionInfo hasSelectedDeploymentType={hasSelectedDeploymentType} connectionIdLinks={links} canEdit={canEdit} />

                <Collapse in={canConfigureConnection}>
                    <ConfigurationFormContent connection={connection} canEdit={canEdit} formSaveState={lastSaveState} fileUploadRef={fileUploadRef}/>
                </Collapse>
            </M3ConfigurationForm>
        </Box>
    );
};
