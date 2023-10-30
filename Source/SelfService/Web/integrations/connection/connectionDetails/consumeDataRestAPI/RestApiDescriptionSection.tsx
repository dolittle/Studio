// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { ContentSection, IconButton, Link } from '@dolittle/design-system';


export type RestApiDescriptionSectionProps = {
    restApiBaseUrl: string;
};

export const RestApiDescriptionSection = ({ restApiBaseUrl }: RestApiDescriptionSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const baseApiUrlWithTrailingSlash = restApiBaseUrl.endsWith('/') ? restApiBaseUrl : `${restApiBaseUrl}/`;
    const restApiUrl = `${baseApiUrlWithTrailingSlash}swagger/index.html`;
    const openApiDocumentationUrl = `${baseApiUrlWithTrailingSlash}swagger/v1/swagger.json`;

    const handleRestApiLinkCopy = () => {
        navigator.clipboard.writeText(restApiUrl);
        enqueueSnackbar('Rest API URL copied to clipboard.');
    };

    const handleOpenApiDocumentationLinkCopy = () => {
        navigator.clipboard.writeText(openApiDocumentationUrl);
        enqueueSnackbar('OpenAPI documentation copied to clipboard.');
    };

    return (
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
    );
};
