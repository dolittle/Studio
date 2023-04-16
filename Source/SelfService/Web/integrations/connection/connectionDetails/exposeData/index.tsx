// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';

import { Collapse, Divider, Grid, FormGroup, FormControlLabel, FormHelperText, Paper, Switch, TextField, Typography } from '@mui/material';

import { Button, IconButton, Link } from '@dolittle/design-system';

const restApiUrl = 'https://ec456365-3784-4871-a39f-2dfed993e5bb.dolittle.cloud/mym3connector/';
const openApiDocumentationUrl = 'https://supplierstuff.swagger.io/v2/swagger.json';
const credetialToken = 'n$H8rAp3mDJGiR7Adn4@paAzQ7J$cNJSEkzqPDYi';

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
        navigator.clipboard.writeText(credetialToken);
        enqueueSnackbar('Token copied to clipboard.');
    };

    return (
        <Paper sx={{ px: 2, maxWidth: 1200 }}>
            <Grid container sx={{ my: 3, justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid item>
                    <Typography variant='subtitle1'>Exposing your data</Typography>
                </Grid>

                <Grid item>
                    <FormGroup>
                        <FormControlLabel control={<Switch />} label='Deploy service' sx={{ mx: 0 }} />
                    </FormGroup>
                </Grid>
            </Grid>

            <Divider sx={{ borderColor: 'outlineborder' }} />

            <Grid container sx={{ my: 3 }}>
                <Grid item>
                    <Typography variant='subtitle2'>Rest API URL</Typography>
                </Grid>

                <Grid container item spacing={1} sx={{ alignItems: 'center', pt: 1 }}>
                    <Grid item>
                        <Link target href='#' message={restApiUrl} />
                    </Grid>

                    <Grid item>
                        <IconButton
                            tooltipText='Copy rest API URL link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleRestApiLinkCopy}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid container sx={{ my: 3 }}>
                <Grid container item>
                    <Typography variant='subtitle2'>Rest API Documentation</Typography>
                </Grid>

                <Grid container item sx={{ pt: 1.5 }}>
                    <Typography>Our rest API is documented using OpenAPI.</Typography>
                </Grid>

                <Grid container item spacing={1} sx={{ alignItems: 'center', pt: 1 }}>
                    <Grid item>
                        <Link
                            target
                            ariaLabel='OpenAPI documentation'
                            href={openApiDocumentationUrl}
                            message={openApiDocumentationUrl}
                        />
                    </Grid>

                    <Grid item>
                        <IconButton
                            tooltipText='Copy OpenAPI documentation link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleOpenApiDocumentationLinkCopy}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Divider sx={{ borderColor: 'outlineborder' }} />

            <Grid container sx={{ my: 3, justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid item>
                    <Typography variant='subtitle2'>Credentials</Typography>
                </Grid>

                <Grid item>
                    <Button label='Generate New Credentials' variant='outlined' onClick={() => setOpenCredentials(true)} />
                </Grid>
            </Grid>

            <Collapse in={openCredentials}>
                <Grid container spacing={3} sx={{ my: 2 }}>
                    <Grid container item spacing={3}>
                        <Grid item>
                            <Typography sx={{ mb: 2 }}>Who or what are these credentials for?</Typography>
                            <TextField id='credentialsName' label='Name' size='small' />
                        </Grid>

                        <Grid container item spacing={1} xs={6}>
                            <Grid item>
                                <Typography sx={{ mb: 2 }}>Credential Token</Typography>
                                <TextField
                                    id='credentialsToken'
                                    label='Token'
                                    size='small'
                                    type='password'
                                    value={credetialToken}
                                    disabled
                                    sx={{ width: 400 }}
                                />
                                <FormHelperText>This bearer token should be used in the request header.</FormHelperText>
                            </Grid>

                            <Grid item sx={{ alignSelf: 'center', mt: 2.5 }}>
                                <Button
                                    label='Copy Token'
                                    startWithIcon='CopyAllRounded'
                                    onClick={handleTokenCopy}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container item sx={{ justifyContent: 'flex-end', mt: 2 }}>
                        <Grid item>
                            <Button
                                label='Delete credentials'
                                color='subtle'
                                variant='outlined'
                                startWithIcon='DeleteRounded'
                                onClick={() => setOpenCredentials(false)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
        </Paper>
    );
};
