// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useConnectionIdFromRoute } from '../../../routes.hooks';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { ContentContainer, ContentHeader, ContentSection, IconButton, Link, Switch } from '@dolittle/design-system';


/* this is hard-coded to inspiring-ritchie, which is bridge-api -dev
   since it requires an X-Organization-ID header it won't really work for "real"
   users. The prod bridge-api won't be available anyway, so we need to proxy this
   to allow access.
 */
const asyncApiSpecificationUrlTemplate = 'https://{bridgeApiHost}/connections/{id}/asyncapi/spec.json';

export const ConsumeDataEventStreamsView = () => {
    const bridgeApiHost = 'inspiring-ritchie.dolittle.cloud';
    const connectionId = useConnectionIdFromRoute();
    const asyncApiSpecificationUrl = asyncApiSpecificationUrlTemplate
        .replace('{bridgeApiHost}', bridgeApiHost)
        .replace('{id}', connectionId || '');

    const { enqueueSnackbar } = useSnackbar()   ;

    const handleAsyncApiSpecificationLinkCopy = () => {
        navigator.clipboard.writeText(asyncApiSpecificationUrl);
        enqueueSnackbar('AsyncAPI specification copied to clipboard.');
    };

    return (
        <>
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
