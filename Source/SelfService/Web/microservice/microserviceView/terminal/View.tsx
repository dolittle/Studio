// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { Box } from '@mui/material';
import { Terminal, TerminalConnect } from '@dolittle/design-system/atoms/Terminal';

import { connect as ttydConnect } from './ttyd';

export type ViewProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const View = (props: ViewProps) => {
    const connect = useMemo<TerminalConnect>(() =>
        ({ columns, rows }) =>
            ttydConnect(`/proxy/${props.applicationId}/${props.environment}/${props.microserviceId}/shell`, columns, rows)
    , [props.applicationId, props.environment, props.microserviceId]);

    return (
        <Terminal
            connect={connect}
        />
    );
};
