// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';

import { Terminal } from 'xterm';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';

import { default as styles } from './LogOutput.module.scss';

export interface ILogOutputProps {
    terminalReady?: (terminal: Terminal) => void;
}

export const LogOutput = (props: ILogOutputProps) => {
    const xtermRef = React.createRef<XTerm>();
    const fitAddon = new FitAddon();

    useEffect(() => {
        if (props.terminalReady && xtermRef.current) {
            props.terminalReady(xtermRef.current.terminal);
        }
        fitAddon.fit();

        window.addEventListener('resize', () => fitAddon.fit());
    });

    return (
        <XTerm options={{ disableStdin: true, fontSize: 12 }}
            className={styles.terminal}
            ref={xtermRef}
            addons={[fitAddon]} />
    );
};
