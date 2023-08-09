// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Typography } from '@mui/material';
import { Button, ContentSection } from '@dolittle/design-system';

export type EnableRestApiSectionProps = {
    onEnableRestApi?: () => void;
};

export const EnableRestApiSection = (props: EnableRestApiSectionProps) => {
    return (
        <ContentSection title='Enable Rest API'>
            <Typography my={2}>
                The Bridge can let you consume data from the messages you have set up through a Rest API service.
            </Typography>

            <Typography my={2}>
                The Rest API service is a dedicated service for your connector that exposes the message types you have set up.
                The API is fully documented and will reflect the message types set up for the connector.
            </Typography>

            <Typography my={2}>
                The first time you enable the Rest API may take a few minutes to set up and deploy your dedicated service.
                To enable this, press the Deploy service button.
            </Typography>
            <Button label='Enable Rest Api' variant='fullwidth' startWithIcon='RocketLaunch' onClick={() => props.onEnableRestApi?.()} />
        </ContentSection>
    );
};
