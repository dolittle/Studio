// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';

import { Box, Collapse, Divider, FormGroup, FormControlLabel, FormHelperText, Grid, Paper, Switch, TextField, Typography } from '@mui/material';

import { Button, IconButton, Link } from '@dolittle/design-system';

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
        <Paper sx={{ px: 2 }}>
            <Box sx={styles}>
                <Typography variant='subtitle1'>Exposing your data</Typography>

                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked disabled />} label='Deploy service' sx={{ mx: 0 }} />
                </FormGroup>
            </Box>

            <Divider sx={{ borderColor: 'outlineborder' }} />

            <Box sx={{ my: 3 }}>
                <Typography variant='subtitle2'>Rest API URL</Typography>

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
            </Box>

            <Box sx={{ my: 3 }}>
                <Typography variant='subtitle2'>Rest API Documentation</Typography>
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
            </Box>

            <Divider sx={{ borderColor: 'outlineborder' }} />

            <Box sx={styles}>
                <Typography variant='subtitle2'>Credentials</Typography>
                <Button label='Generate New Credentials' variant='outlined' onClick={() => setOpenCredentials(true)} />
            </Box>

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
        </Paper>
    );
};
