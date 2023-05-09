// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { ContentContainer, ContentHeader, ContentSection, IconButton, Link, Switch } from '@dolittle/design-system';
import { CredentialsContainer } from './Credentials/CredentialsContainer';

const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: { xs: 'column', sm: 'row' },
    my: 3,
    gap: 2,
};

const restApiUrl = 'https://inspiring-ritchie.dolittle.cloud/erpreadmodels/swagger/index.html';
const openApiDocumentationUrl = 'https://inspiring-ritchie.dolittle.cloud/erpreadmodels/swagger/v1/swagger.json';

export const ExposeDataView = () => {
    const { enqueueSnackbar } = useSnackbar();


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
        </>
    );
};
