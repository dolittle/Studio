// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box } from '@mui/material';
import { Terminal } from '@dolittle/design-system/atoms/Terminal';

import { useReconnecting } from './useReconnecting';

export type ViewProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const View = (props: ViewProps) => {
    const streams = useReconnecting(`/proxy/${props.applicationId}/${props.environment}/${props.microserviceId}/shell/`, 40, 10);

    return (
        <Terminal
            {...streams}
        />
    );
};
