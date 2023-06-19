// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { AccordionList, AccordionListProps, FileUploadFormRef } from '@dolittle/design-system';

import { useConnectionsIdGet } from '../../../apis/integrations/connectionsApi.hooks';
import { useConnectionId } from '../../routes.hooks';
import { Page } from '../../../components/layout/page';

import { MainM3ConnectionInfo } from './components/MainM3ConnectionInfo';
import { ActionButtons } from './components/ActionButtons';
import { useBuildConfigurationAccordionList } from './useBuildConfigurationAccordionList';
import { M3ConfigurationForm } from './components/M3ConfigurationForm';

export const NewConnectionView = () => {
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


    if (query.isLoading) return <>Loading</>;
    if (!connection || !connectionId) return null;

    return (
        <Page title='New M3 Connection'>
            <Box sx={{ maxWidth: 814, mt: 7, ml: 1 }}>
                <Typography variant='subtitle1'>{`Let's get your M3 connector up and running...`}</Typography>
                <M3ConfigurationForm
                    connectionId={connectionId}
                    connection={connection}
                    hasSelectedDeploymentType={hasSelectedDeploymentType}
                    onIonConfigurationSaved={() => fileUploadRef.current?.clearSelected()}
                >
                    <MainM3ConnectionInfo hasSelectedDeploymentType={hasSelectedDeploymentType} connectionIdLinks={links} />

                    <AccordionList  {...accordionListProps} />

                    <ActionButtons connection={connection} />
                </M3ConfigurationForm>
            </Box>
        </Page>
    );
};
