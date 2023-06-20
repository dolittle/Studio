// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef, useState } from 'react';

import { Box, Collapse, Typography } from '@mui/material';

import { AccordionList, AccordionListProps, Button, FileUploadFormRef } from '@dolittle/design-system';

import { useConnectionsIdGet } from '../../../../apis/integrations/connectionsApi.hooks';
import { useConnectionId } from '../../../routes.hooks';

import { M3ConfigurationForm } from '../../configuration/M3ConfigurationForm';
import { MainM3ConnectionInfo } from '../../configuration/MainM3ConnectionInfo';
import { useBuildConfigurationAccordionList } from '../../configuration/useBuildConfigurationAccordionList';
import { ActionToolbar } from './ActionToolbar';


export const ConfigurationView = () => {
    const [canEdit, setEditMode] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const connectionId = useConnectionId();
    const query = useConnectionsIdGet(
        { id: connectionId || '' },
        { refetchInterval: (data) => data?.value?.status.name !== 'Connected' ? 5000 : false }
    );

    const fileUploadRef = useRef<FileUploadFormRef>(null);
    const connection = query.data?.value;
    const links = query.data?.links || [];

    const deploymentType = connection?.chosenEnvironment?.value;
    const hasSelectedDeploymentType = deploymentType?.toLowerCase() !== 'unknown';

    const accordionListProps: AccordionListProps = useBuildConfigurationAccordionList(connection, fileUploadRef);
    const canConfigureConnection = connection?.status?.name !== 'Registered';

    if (query.isLoading) return <>Loading</>;
    if (!connection || !connectionId) return null;

    return (
        <Box sx={{ mt: 6, ml: 2 }}>
            <Typography variant='subtitle1'>Configuration Setup</Typography>

            <M3ConfigurationForm
                connectionId={connectionId}
                connection={connection}
                hasSelectedDeploymentType={hasSelectedDeploymentType}
                onIonConfigurationSaved={() => fileUploadRef.current?.clearSelected()}
            >
                <ActionToolbar
                    canEdit={canEdit}
                    onEdit={() => setEditMode(true)}
                    onDelete={() => { }}
                    onCancel={() => {
                        if (resetForm) {
                            setResetForm(false);
                        }
                        setEditMode(false);
                        setResetForm(false);
                    }}
                />
                <MainM3ConnectionInfo hasSelectedDeploymentType={hasSelectedDeploymentType} connectionIdLinks={links} />

                <Collapse in={canConfigureConnection}>
                    <AccordionList  {...accordionListProps} />
                </Collapse>
            </M3ConfigurationForm>
        </Box>
    );
};
