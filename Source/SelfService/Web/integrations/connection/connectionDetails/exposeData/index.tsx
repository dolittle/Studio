// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useConnectionId } from '../../../routes.hooks';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { ContentContainer, ContentHeader, ContentSection, IconButton, Link, Switch } from '@dolittle/design-system';
import { CredentialsContainer } from './Credentials/CredentialsContainer';

// const styles = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: { xs: 'column', sm: 'row' },
//     my: 3,
//     gap: 2,
// };

/* The ERP ReadModels -service must be specific to the connection, so we need
    to generate the URL dynamically. */
const restApiUrl = 'https://inspiring-ritchie.dolittle.cloud/erpreadmodels/swagger/index.html';
const openApiDocumentationUrl = 'https://inspiring-ritchie.dolittle.cloud/erpreadmodels/swagger/v1/swagger.json';

/* this is hard-coded to inspiring-ritchie, which is bridge-api -dev
   since it requires an X-Organization-ID header it won't really work for "real"
   users. The prod bridge-api won't be available anyway, so we need to proxy this
   to allow access.
 */
const asyncApiSpecificationUrlTemplate = 'https://{bridgeApiHost}/connections/{id}/asyncapi/spec.json';

export const ExposeDataView = () => {
    const bridgeApiHost = 'inspiring-ritchie.dolittle.cloud';
    // get connectionId from the route
    const connectionId = useConnectionId();
    const asyncApiSpecificationUrl = asyncApiSpecificationUrlTemplate
        .replace('{bridgeApiHost}', bridgeApiHost)
        .replace('{id}', connectionId || '');

    const { enqueueSnackbar } = useSnackbar();

    const handleRestApiLinkCopy = () => {
        navigator.clipboard.writeText(restApiUrl);
        enqueueSnackbar('Rest API URL copied to clipboard.');
    };

    const handleOpenApiDocumentationLinkCopy = () => {
        navigator.clipboard.writeText(openApiDocumentationUrl);
        enqueueSnackbar('OpenAPI documentation copied to clipboard.');
    };

    const handleAsyncApiSpecificationLinkCopy = () => {
        navigator.clipboard.writeText(asyncApiSpecificationUrl);
        enqueueSnackbar('AsyncAPI specification copied to clipboard.');
    };

    return (
        <>
            <ContentContainer>
                <ContentHeader
                    title='Exposing your data'
                    buttonsSlot={<Switch.UI id='deploy-switch' label='Deploy service' defaultChecked sx={{ mx: 0 }} />}
                />

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
            </ContentContainer>

            <CredentialsContainer />

            <ContentContainer>
                <ContentHeader title='Async API Specification' />
                <ContentSection hideDivider title='Async API Specification'>
                    <Typography sx={{ pt: 1.5 }}>Our async API is documented using AsyncAPI.</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                        <Link
                            target
                            ariaLabel='AsyncAPI specification'
                            href={asyncApiSpecificationUrl}
                            message={asyncApiSpecificationUrl}
                        />
                        <IconButton
                            tooltipText='Copy AsyncAPI specification link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleAsyncApiSpecificationLinkCopy}
                        />
                    </Box>
                </ContentSection>
            </ContentContainer>
        </>
    );
};
