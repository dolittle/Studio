// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';

import { IconButton, InlineWrapper, Link } from '@dolittle/design-system';


export type ActiveRestApiViewProps = {
    restApiBaseUrl: string;
};

export const ActiveRestApiView = ({ restApiBaseUrl }: ActiveRestApiViewProps) => {
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
            <section>
                <Typography>Rest API URL:</Typography>

                <InlineWrapper>
                    <Link label={restApiUrl} href={restApiUrl} target ariaLabel='Rest API URL' />
                    <IconButton tooltipText='Copy rest API URL link to clipboard' icon='CopyAllRounded' color='primary' onClick={handleRestApiLinkCopy} />
                </InlineWrapper>
            </section>

            <section>
                <Typography sx={{ mt: 2 }}>Rest API Documentation:</Typography>

                <InlineWrapper>
                    <Link label={openApiDocumentationUrl} href={openApiDocumentationUrl} target ariaLabel='OpenAPI documentation' />
                    <IconButton tooltipText='Copy OpenAPI documentation link to clipboard' icon='CopyAllRounded' color='primary' onClick={handleOpenApiDocumentationLinkCopy} />
                </InlineWrapper>
            </section>
        </>
    );
};
