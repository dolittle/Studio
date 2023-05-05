// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';

import { Box, Collapse, FormHelperText, Grid, TextField, Typography } from '@mui/material';

import { Button, ContentContainer, ContentHeader, ContentSection, IconButton, Link, Switch } from '@dolittle/design-system';

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
const credentialToken = 'n$H8rAp3mDJGiR7Adn4@paAzQ7J$cNJSEkzqPDYi';

export const ExposeDataView = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [openCredentials, setOpenCredentials] = useState(false);

    const handleRestApiLinkCopy = () => {
        navigator.clipboard.writeText(restApiUrl);
        enqueueSnackbar('Rest API URL copied to clipboard.');
    };

    const handleOpenApiDocumentationLinkCopy = () => {
        navigator.clipboard.writeText(openApiDocumentationUrl);
        enqueueSnackbar('OpenAPI documentation copied to clipboard.');
    };

    const handleTokenCopy = () => {
        navigator.clipboard.writeText(credentialToken);
        enqueueSnackbar('Token copied to clipboard.');
    };

    return (
        <ContentContainer>
            <ContentHeader
                title='Exposing your data'
                buttonsSlot={<Switch.UI id='deploy-switch' label='Deploy service' defaultChecked sx={{ mx: 0 }} />}
                sx={{ my: 2 }}
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
            <ContentSection
                title='Credentials'
                headerProps={{ buttons: [{ label: 'Generate New Credentials', variant: 'outlined', onClick: () => setOpenCredentials(true) }] }}
            >
                <Collapse in={openCredentials}>
                    <Grid container spacing={3} sx={{ pb: 5 }}>
                        <Grid item>
                            <Typography sx={{ mb: 2 }}>Who or what are these credentials for?</Typography>
                            <TextField id='credentialsName' label='Name' size='small' />
                        </Grid>

                        <Grid item>
                            <Typography sx={{ mb: 2 }}>Credential Token</Typography>
                            <TextField
                                id='credentialsToken'
                                label='Token'
                                size='small'
                                type='password'
                                value={credentialToken}
                                disabled
                                sx={{ width: 400 }}
                            />
                            <FormHelperText>This bearer token should be used in the request header.</FormHelperText>
                        </Grid>

                        <Grid container item spacing={3} xs={6} sx={{ alignItems: 'center', mt: 0 }}>
                            <Grid item>
                                <Button label='Copy Token' startWithIcon='CopyAllRounded' onClick={handleTokenCopy} />
                            </Grid>

                            <Grid item>
                                <Button label='Delete credentials' startWithIcon='DeleteRounded' onClick={() => setOpenCredentials(false)} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse>
            </ContentSection>
        </ContentContainer>
    );
};
