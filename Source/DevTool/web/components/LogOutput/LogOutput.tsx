// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';

import { Terminal } from 'xterm';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';

import { default as styles } from '../../microservices/LogOutput.module.scss';
import { LogOutputViewModel } from './LogOutputViewModel';
import { withViewModel } from '@dolittle/vanir-react';
import { RunningInstanceType } from '../../../common/applications/IApplications';

export interface ILogOutputProps {
    terminalReady?: (terminal: Terminal) => void;
    instance: RunningInstanceType;
}

export const LogOutput = withViewModel<LogOutputViewModel, ILogOutputProps>(LogOutputViewModel, ({ viewModel, props }) => {
    const xtermRef = React.createRef<XTerm>();
    const fitAddon = new FitAddon();

    useEffect(() => {
        fitAddon.fit();
        if (xtermRef.current) {
            props.terminalReady?.(xtermRef.current.terminal);
            viewModel.startCapture(xtermRef.current.terminal, props.instance);
        }

        window.addEventListener('resize', () => fitAddon.fit());

        return () => {
            viewModel.stopCapture();
        };
    });

    return (
        <XTerm options={{ disableStdin: true, fontSize: 12 }}
            className={styles.terminal}
            ref={xtermRef}
            addons={[fitAddon]} />
    );
});
