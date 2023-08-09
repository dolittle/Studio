// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { Button, ContentContainer, ContentHeader, ContentSection, IconButton, Link, Switch } from '@dolittle/design-system';
import { useConnectionsIdRestApiStatusGet } from '../../../../apis/integrations/connectionRestApiApi.hooks';
import { useConnectionIdFromRoute } from '../../../routes.hooks';
import { CredentialsContainer } from './Credentials/CredentialsContainer';
import { EnableRestApiSection } from './EnableRestApiSection';

/* The ERP ReadModels -service must be specific to the connection, so we need
    to generate the URL dynamically. */
const restApiUrl = 'https://inspiring-ritchie.dolittle.cloud/erpreadmodels/swagger/index.html';
const openApiDocumentationUrl = 'https://inspiring-ritchie.dolittle.cloud/erpreadmodels/swagger/v1/swagger.json';


export const ConsumeDataRestAPIView = () => {
    const [forceShowEnable, setForceShowEnable] = React.useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionIdFromRoute();
    const { data: apiStatus } = useConnectionsIdRestApiStatusGet({ id: connectionId });

    const handleRestApiLinkCopy = () => {
        navigator.clipboard.writeText(restApiUrl);
        enqueueSnackbar('Rest API URL copied to clipboard.');
    };

    const handleOpenApiDocumentationLinkCopy = () => {
        navigator.clipboard.writeText(openApiDocumentationUrl);
        enqueueSnackbar('OpenAPI documentation copied to clipboard.');
    };

    const showEnableSection = (apiStatus?.target === 'Disabled') || forceShowEnable;
    const showInfoSection = (apiStatus?.target === 'Enabled') && !forceShowEnable;

    return (
        <>
            <ContentContainer>
                <ContentHeader
                    title='Consume data over a REST API'
                    buttonsSlot={
                        <Switch.UI
                            id='deploy-switch'
                            label='Force deployed'
                            checked={!forceShowEnable}
                            sx={{ mx: 0 }}
                            onChange={() => setForceShowEnable(!forceShowEnable)}
                        />}
                />
                {showEnableSection &&
                    <EnableRestApiSection
                        onEnableRestApi={() => setForceShowEnable(false)}
                    />
                }

                {showInfoSection && (
                    <>
                        <ContentSection title='Rest API URL'>
                            <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                                <Link
                                    target
                                    href={restApiUrl}
                                    message={restApiUrl}
                                />
                                <IconButton
                                    tooltipText='Copy rest API URL link to clipboard'
                                    icon='CopyAllRounded'
                                    color='primary'
                                    onClick={handleRestApiLinkCopy}
                                />
                            </Box>
                        </ContentSection>

                        <ContentSection hideDivider title='Rest API Documentation'>
                            <Typography sx={{ pt: 1.5 }}>Our rest API is documented using OpenAPI.</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                                <Link
                                    target
                                    ariaLabel='OpenAPI documentation'
                                    href={openApiDocumentationUrl}
                                    message={openApiDocumentationUrl}
                                />
                                <IconButton
                                    tooltipText='Copy OpenAPI documentation link to clipboard'
                                    icon='CopyAllRounded'
                                    color='primary'
                                    onClick={handleOpenApiDocumentationLinkCopy}
                                />
                            </Box>
                        </ContentSection>
                    </>
                )
                }

            </ContentContainer>

            <CredentialsContainer />
        </>
    );
};

