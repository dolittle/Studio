// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { Box, Collapse, Typography } from '@mui/material';

import { AccordionList, AccordionListProps, FileUploadFormRef } from '@dolittle/design-system';

import { useConnectionsIdGet, useConnectionsIdDelete } from '../../../../apis/integrations/connectionsApi.hooks';
import { CACHE_KEYS } from '../../../../apis/integrations/CacheKeys';
import { getConnectionStatus } from '../../../../utils/helpers';
import { useConnectionId } from '../../../routes.hooks';
import { M3ConfigurationForm, M3ConfigurationFormRef } from '../../configuration/M3ConfigurationForm';
import { MainM3ConnectionInfo } from '../../configuration/MainM3ConnectionInfo';
import { useBuildConfigurationAccordionList } from '../../configuration/useBuildConfigurationAccordionList';
import { ActionToolbar } from './ActionToolbar';

export const ConfigurationView = () => {
    const [canEdit, setEditMode] = useState(false);
    const connectionId = useConnectionId();
    const query = useConnectionsIdGet(
        { id: connectionId || '' },
        { refetchInterval: (data) => data?.value?.status.name !== 'Connected' ? 5000 : false }
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

        if(getConnectionStatus(connection.status.name).label === 'pending') {
            setEditMode(true);
        };

    }, [connection?.status.name]);

    const deploymentType = connection?.chosenEnvironment?.value;
    const hasSelectedDeploymentType = deploymentType?.toLowerCase() !== 'unknown';

    const accordionListProps: AccordionListProps = useBuildConfigurationAccordionList(connection, fileUploadRef, canEdit);
    const canConfigureConnection = connection?.status?.name !== 'Registered';

    const handleDelete = () => {
        deleteMutation.mutate(
            { id: connectionId! },
            {
                onSuccess() {
                    queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.Connections_GET] });
                    enqueueSnackbar(`Deleted connection: ${connectionId}`, { variant: 'success' });
                    navigate('/integrations/connections');
                },
                onError() {
                    enqueueSnackbar(`Error occurred when deleting connection: ${connectionId}`, { variant: 'error' });
                },
            },
        );
    };

    if (query.isLoading) return <>Loading</>;
    if (!connection || !connectionId) return null;

    return (
        <Box sx={{ mt: 6, ml: 2 }}>
            <Typography variant='subtitle1'>Configuration Setup</Typography>

            <M3ConfigurationForm
                connectionId={connectionId}
                connection={connection}
                hasSelectedDeploymentType={hasSelectedDeploymentType}
                onSaved={() => {
                    fileUploadRef.current?.clearSelected();
                    setEditMode(false);
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
                />

                <MainM3ConnectionInfo hasSelectedDeploymentType={hasSelectedDeploymentType} connectionIdLinks={links} canEdit={canEdit} />

                <Collapse in={canConfigureConnection}>
                    <AccordionList  {...accordionListProps} />
                </Collapse>
            </M3ConfigurationForm>
        </Box>
    );
};
