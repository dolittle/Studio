// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { CopyIconButton, InlineWrapper, Link } from '@dolittle/design-system';

export type ActiveRestApiViewProps = {
    restApiBaseUrl: string;
};

export const ActiveRestApiView = ({ restApiBaseUrl }: ActiveRestApiViewProps) => {
    const baseApiUrlWithTrailingSlash = restApiBaseUrl.endsWith('/') ? restApiBaseUrl : `${restApiBaseUrl}/`;
    const restApiUrl = `${baseApiUrlWithTrailingSlash}swagger/index.html`;
    const openApiDocumentationUrl = `${baseApiUrlWithTrailingSlash}swagger/v1/swagger.json`;

    return (
        <>
            <section>
                <Typography>Rest API URL:</Typography>

                <InlineWrapper>
                    <Link label={restApiUrl} href={restApiUrl} target ariaLabel='Rest API URL' />
                    <CopyIconButton text={restApiUrl} message='Rest API URL copied to clipboard.' color='primary' tooltipText='Copy the Rest API URL link to the clipboard.' />
                </InlineWrapper>
            </section>

            <section>
                <Typography sx={{ mt: 2 }}>Rest API Documentation:</Typography>

                <InlineWrapper>
                    <Link label={openApiDocumentationUrl} href={openApiDocumentationUrl} target ariaLabel='OpenAPI documentation' />
                    <CopyIconButton text={openApiDocumentationUrl} message='OpenAPI documentation copied to clipboard.' color='primary' tooltipText='Copy the OpenAPI documentation link to the clipboard.' />
                </InlineWrapper>
            </section>
        </>
    );
};
