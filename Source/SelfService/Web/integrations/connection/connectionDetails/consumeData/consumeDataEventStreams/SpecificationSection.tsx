// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { generatePath, useHref } from 'react-router-dom';

import { ContentWithSubtitle, CopyIconButton, InlineWrapper, Link } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../routes.hooks';

export const SpecificationSection = () => {
    const connectionId = useConnectionIdFromRoute();

    const asyncApiSpecificationUrlTemplate = '/api/bridge/connections/:id/asyncapi/spec.json';
    const resolvedAsyncApiSpecificationUrlWithBasename = useHref(generatePath(asyncApiSpecificationUrlTemplate, { id: connectionId }));
    const asyncApiSpecificationUrl = `${window.location.origin}${resolvedAsyncApiSpecificationUrlWithBasename}`;

    return (
        <ContentWithSubtitle title='Async API Specification' infoTooltipLabel='The API for consuming event streams are defined using AsyncAPI.'>
            <InlineWrapper>
                <Link
                    label={asyncApiSpecificationUrl}
                    href={asyncApiSpecificationUrl}
                    target
                    ariaLabel='AsyncAPI specification'
                />

                <CopyIconButton
                    text={asyncApiSpecificationUrl}
                    message='AsyncAPI specification copied to clipboard.'
                    color='primary'
                    tooltipText='Copy AsyncAPI specification link to clipboard.'
                />
            </InlineWrapper>
        </ContentWithSubtitle>
    );
};
