// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { Terminal, TerminalConnect } from '@dolittle/design-system';

import { connect as ttydConnect } from './ttyd';
import { useTTYdUrl } from './useTerminal';

export type TerminalIndexProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const TerminalIndex = ({ applicationId, environment, microserviceId }: TerminalIndexProps) => {
    const url = useTTYdUrl(applicationId, environment, microserviceId);

    const connect = useMemo<TerminalConnect>(() => ({ columns, rows, signal }) =>
        ttydConnect(url, columns, rows, signal), [url]);

    return (
        <Terminal connect={connect} sx={{ height: '70vh', }} />
    );
};
