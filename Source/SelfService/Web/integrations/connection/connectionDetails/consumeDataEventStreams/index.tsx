// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';
import { useHref, generatePath } from 'react-router-dom';
import { ContentContainer, ContentHeader, ContentParagraph, ContentSection, IconButton, Link } from '@dolittle/design-system';
import { useConnectionIdFromRoute } from '../../../routes.hooks';
import { ServiceAccountsSection } from './serviceAccounts/ServiceAccountsSection';

const asyncApiSpecificationUrlTemplate = '/api/bridge/connections/:id/asyncapi/spec.json';
const caFileUrlTemplate = '/api/bridge/resources/kafka/ca.pem';

export const ConsumeDataEventStreamsView = () => {
    const connectionId = useConnectionIdFromRoute();
    const resolvedAsyncApiSpecificationUrlWithBasename = useHref(generatePath(asyncApiSpecificationUrlTemplate, { id: connectionId }));
    const asyncApiSpecificationUrl = `${window.location.origin}${resolvedAsyncApiSpecificationUrlWithBasename}`;

    const resolvedCAFileUrlWithBasename = useHref(generatePath(caFileUrlTemplate));
    const caFileUrl = `${window.location.origin}${resolvedCAFileUrlWithBasename}`;

    const { enqueueSnackbar } = useSnackbar();

    const handleAsyncApiSpecificationLinkCopy = () => {
        navigator.clipboard.writeText(asyncApiSpecificationUrl);
        enqueueSnackbar('AsyncAPI specification copied to clipboard.');
    };

    const handleCAFileLinkCopy = () => {
        navigator.clipboard.writeText(caFileUrl);
        enqueueSnackbar('Certificate authority pem-file for kafka copied to clipboard.');
    };

    return (
        <>
            <ContentContainer>
                <ContentHeader title='Async API' status={{ status: 'success', label: 'Active' }} />
                <ContentParagraph>
                    Event streams expose message types for the connector to be consumed in external applications and services over Kafka.
                    The event streams are fully documented using Async API specifications and will reflect the message types set up for the connector.
                </ContentParagraph>
                <ContentSection title='Async API Specification'>
                    <Typography>The API for consuming event streams are defined using AsyncAPI.</Typography>
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
                <ContentSection title='Resources'>
                    <Typography>Download the Certificate Authority file for Kafka. You will need this to connect your application to consume messages.</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                        <Link
                            target
                            ariaLabel='Certificate Authority file'
                            href={caFileUrl}
                            message={caFileUrl}
                        />
                        <IconButton
                            tooltipText='Copy Certificate Authority file to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleCAFileLinkCopy}
                        />
                    </Box>
                </ContentSection>
                <ServiceAccountsSection />
            </ContentContainer>
        </>
    );
};
