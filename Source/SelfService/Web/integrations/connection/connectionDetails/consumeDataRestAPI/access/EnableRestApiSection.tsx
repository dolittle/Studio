// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { NoContentSection } from '@dolittle/design-system';

export type EnableRestApiSectionProps = {
    disabled: boolean;
    onEnableRestApi: () => void;
};

export const EnableRestApiSection = ({ onEnableRestApi, disabled }: EnableRestApiSectionProps) =>
    <NoContentSection
        title='Rest API is not enabled yet...'
        description={`To enable the Rest API service, press the 'Enable REST API' button. The first time you enable the Rest API may take a few minutes to set up and deploy your dedicated service.`}
        label='Enable Rest API'
        icon='RocketLaunch'
        isDisabled={disabled}
        onCreate={() => onEnableRestApi?.()}
        sx={{ p: 0 }}
    />;
