// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { generatePath, useHref } from 'react-router-dom';

import { Typography } from '@mui/material';

import { ContentWithSubtitle, CopyIconButton, Icon, IconButton, InlineWrapper, Link } from '@dolittle/design-system';

export type ResourcesSectionProps = {
    connectionId: string;
};

export const ResourcesSection = ({ connectionId }: ResourcesSectionProps) => {
    const caFileUrlTemplate = '/api/bridge/resources/kafka/ca.pem';
    const resolvedCAFileUrlWithBasename = useHref(generatePath(caFileUrlTemplate));
    const caFileUrl = `${window.location.origin}${resolvedCAFileUrlWithBasename}`;

    const asyncApiSpecificationUrlTemplate = '/api/bridge/connections/:id/asyncapi/spec.json';
    const resolvedAsyncApiSpecificationUrlWithBasename = useHref(generatePath(asyncApiSpecificationUrlTemplate, { id: connectionId }));
    const asyncApiSpecificationUrl = `${window.location.origin}${resolvedAsyncApiSpecificationUrlWithBasename}`;

    return (
        <ContentWithSubtitle title='Resources'>
            <section>
                <InlineWrapper sx={{ mt: 2 }}>
                    <Typography>Async API Specification:</Typography>
                    <Icon icon='InfoRounded' tooltipLabel='The API for consuming event streams are defined using AsyncAPI.' />
                </InlineWrapper>

                <InlineWrapper>
                    <Link label={asyncApiSpecificationUrl} href={asyncApiSpecificationUrl} target ariaLabel='AsyncAPI specification' />
                    <CopyIconButton
                        textToCopy={asyncApiSpecificationUrl}
                        snackbarMessage='AsyncAPI specification link copied to clipboard.'
                        color='primary'
                        tooltipText='Copy the AsyncAPI specification link to the clipboard.'
                    />
                </InlineWrapper>
            </section>

            <section>
                <InlineWrapper sx={{ mt: 2 }}>
                    <Typography>Download the Certificate Authority file for Kafka:</Typography>
                    <Icon icon='InfoRounded' tooltipLabel={`You will need this to connect your application to 'Consume Messages'.`} />
                </InlineWrapper>

                <InlineWrapper>
                    <Link label={caFileUrl} href={caFileUrl} target ariaLabel='Certificate Authority file' />
                    <IconButton tooltipText='Download the Certificate Authority file.' icon='DownloadRounded' color='primary' href={caFileUrl} />
                </InlineWrapper>
            </section>
        </ContentWithSubtitle>
    );
};
