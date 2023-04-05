// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';

import { Box, Collapse, Divider, Grid, FormGroup, FormControlLabel, FormHelperText, Paper, Switch, TextField, Typography } from '@mui/material';

import { Button, Icon, IconButton, Link } from '@dolittle/design-system';

const styles = {
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        my: 3,
        gap: 2,
    },
};

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
            <Box sx={styles.content}>
                <Typography variant='subtitle1'>Exposing your data</Typography>

                <FormGroup>
                    <FormControlLabel control={<Switch />} label='Deploy service' sx={{ mx: 0 }} />
                </FormGroup>
            </Box>

            <Divider sx={{ borderColor: 'outlineborder' }} />

            <Box sx={{ my: 3 }}>
                <Typography variant='subtitle2'>Rest API URL</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                    <Link
                        target
                        href='#'
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

            <Box sx={styles.content}>
                <Typography variant='subtitle2'>Credentials</Typography>
                <Button label='Generate New Credentials' variant='outlined' onClick={() => setOpenCredentials(true)} />
            </Box>

            <Collapse in={openCredentials}>
                <Grid container xs sx={{ my: 3, pb: 2, justifyContent: 'space-around' }}>
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
                            value={credetialToken}
                            disabled
                            sx={{ width: 400 }}
                        />
                        <FormHelperText>This bearer token should be used in the request header.</FormHelperText>
                    </Grid>

                    <Grid item>
                        <Button
                            label='Copy Token'
                            startWithIcon={<Icon icon='CopyAllRounded' />}
                            onClick={handleTokenCopy}
                            sx={{ mt: 4.5 }}
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            label='Delete credentials'
                            startWithIcon={<Icon icon='DeleteRounded' />}
                            onClick={() => setOpenCredentials(false)}
                            sx={{ mt: 4.5 }}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Paper>
    );
};
