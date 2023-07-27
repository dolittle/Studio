// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';
import { useHref, generatePath } from 'react-router-dom';
import { ContentContainer, ContentHeader, ContentSection, IconButton, Link } from '@dolittle/design-system';
import { useConnectionIdFromRoute } from '../../../routes.hooks';


/* this is hard-coded to inspiring-ritchie, which is bridge-api -dev
   since it requires an X-Organization-ID header it won't really work for "real"
   users. The prod bridge-api won't be available anyway, so we need to proxy this
   to allow access.
 */
const asyncApiSpecificationUrlTemplate = '/api/bridge/connections/:id/asyncapi/spec.json';

export const ConsumeDataEventStreamsView = () => {
    const connectionId = useConnectionIdFromRoute();
    const generatedPath = generatePath(asyncApiSpecificationUrlTemplate, { id: connectionId || '' });
    const resolvedPathWithBasename = useHref(generatedPath);
    const asyncApiSpecificationUrl = `${window.location.origin}${resolvedPathWithBasename}`;

    const { enqueueSnackbar } = useSnackbar();

    const handleAsyncApiSpecificationLinkCopy = () => {
        navigator.clipboard.writeText(asyncApiSpecificationUrl);
        enqueueSnackbar('AsyncAPI specification copied to clipboard.');
    };

    return (
        <>
            <ContentContainer>
                <ContentHeader title='Consuming your data' />
                <ContentSection title='Async API Specification'>
                    <Typography sx={{ pt: 1.5 }}>Our API for consuming event streams are defined using AsyncAPI.</Typography>
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
