// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { Terminal, TerminalConnect } from '@dolittle/design-system/atoms/Terminal';

import { connect as ttydConnect } from './ttyd';
import { useTTYdUrl } from './useTerminal';

export type ViewProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const View = (props: ViewProps) => {
    const url = useTTYdUrl(props.applicationId, props.environment, props.microserviceId);

    const connect = useMemo<TerminalConnect>(() =>
        ({ columns, rows, signal }) => ttydConnect(url, columns, rows, signal)
    , [url]);

    return (
        <Terminal
            connect={connect}
            sx={{
                height: '70vh',
            }}
        />
    );
};
