// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Collapse, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { AlertBox, Button, ContentSection } from '@dolittle/design-system';
import { useConnectionsIdServiceAccountsGet } from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { useConnectionId } from '../../../../../integrations/routes.hooks';
import { CredentialsList } from './CredentialsList';

export type CredentialsSectionProps = {};

export const CredentialsSection = (props: CredentialsSectionProps) => {
    const [openCredentials, setOpenCredentials] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionId();

    if (!connectionId) {
        return <AlertBox />;
    }

    const { data, isLoading } = useConnectionsIdServiceAccountsGet({ id: connectionId, body: 'body' });
    const credentialToken = 'n$H8rAp3mDJGiR7Adn4@paAzQ7J$cNJSEkzqPDYi';

    const handleTokenCopy = () => {
        navigator.clipboard.writeText(credentialToken);
        enqueueSnackbar('Token copied to clipboard.');
    };


    return (
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
                <CredentialsList credentials={data || []} />
            </Collapse>
        </ContentSection>
    );
};
