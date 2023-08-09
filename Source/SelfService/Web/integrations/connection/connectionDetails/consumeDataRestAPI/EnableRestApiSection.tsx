// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Typography } from '@mui/material';
import { Button, ContentSection, ContentParagraph, StatusIndicator } from '@dolittle/design-system';
import { RestApiServiceStatus } from '../../../../apis/integrations/generated';

export type EnableRestApiSectionProps = {
    onEnableRestApi?: () => void;
    status: RestApiServiceStatus;
};

export const EnableRestApiSection = (props: EnableRestApiSectionProps) => {
    return (
        <ContentSection title='Enable Rest API'>
            <ContentParagraph>
                To enable the Rest API service, press the Deploy service button. The first time you enable the Rest API may take a few minutes to set up and deploy your dedicated service.
            </ContentParagraph>
            <Button label='Enable Rest Api' variant='fullwidth' startWithIcon='RocketLaunch' onClick={() => props.onEnableRestApi?.()} disabled={props.status !== 'Off'} />
        </ContentSection>
    );
};
