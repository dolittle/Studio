// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { Button, ContentContainer, ContentHeader, ContentParagraph, ContentSection, IconButton, Link, Switch } from '@dolittle/design-system';
import { useConnectionsIdRestApiStatusGet } from '../../../../apis/integrations/connectionRestApiApi.hooks';
import { useConnectionIdFromRoute } from '../../../routes.hooks';
import { CredentialsContainer } from './Credentials/CredentialsContainer';
import { EnableRestApiSection } from './EnableRestApiSection';

/* The ERP ReadModels -service must be specific to the connection, so we need
    to generate the URL dynamically. */


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

    const restApiUrl = `${apiStatus?.basePath}swagger/index.html`;
    const openApiDocumentationUrl = `${apiStatus?.basePath}swagger/v1/swagger.json`;


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
                <ContentParagraph>
                    You can consume data through a Rest API service.
                </ContentParagraph>

                <ContentParagraph>
                    The Rest API service is a dedicated service for your connector that exposes the message types you have set up.
                    The API is fully documented and will reflect the message types set up for the connector.
                </ContentParagraph>
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

                        <ContentSection title='Rest API Documentation'>
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
                )}
                <CredentialsContainer />
            </ContentContainer>

        </>
    );
};

