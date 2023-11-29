// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { generatePath, useHref } from 'react-router-dom';

import { ContentWithSubtitle, CopyIconButton, InlineWrapper, Link } from '@dolittle/design-system';

export const ResourcesSection = () => {
    const caFileUrlTemplate = '/api/bridge/resources/kafka/ca.pem';
    const resolvedCAFileUrlWithBasename = useHref(generatePath(caFileUrlTemplate));
    const caFileUrl = `${window.location.origin}${resolvedCAFileUrlWithBasename}`;

    return (
        <ContentWithSubtitle title='Resources' infoTooltipLabel='Download the Certificate Authority file for Kafka. You will need this to connect your application to consume messages.'>
            <InlineWrapper>
                <Link
                    label={caFileUrl}
                    href={caFileUrl}
                    target
                    ariaLabel='Certificate Authority file'
                />

                <CopyIconButton
                    text={caFileUrl}
                    message='Certificate authority pem-file for kafka copied to clipboard.'
                    color='primary'
                    tooltipText='Copy Certificate Authority file to clipboard.'
                />
            </InlineWrapper>
        </ContentWithSubtitle>
    );
};
