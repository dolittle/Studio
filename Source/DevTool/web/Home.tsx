// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';

import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';

const ipcRenderer = window.require('electron').ipcRenderer;

import { default as styles } from './Home.module.scss';
import { withViewModel } from '@dolittle/vanir-react';
import { HomeViewModel } from './HomeViewModel';
import { ApplicationLogMessage } from '../common/IApplicationLog';

export const Home = withViewModel(HomeViewModel, ({viewModel}) => {
    const xtermRef = React.createRef<XTerm>();
    const fitAddon = new FitAddon();

    useEffect(() => {
        fitAddon.fit();
        if (xtermRef.current) {
            viewModel.start();
            ipcRenderer.on(ApplicationLogMessage, (event, message) => {
                xtermRef.current?.terminal.writeln(message);
            });
        }

        window.addEventListener('resize', () => fitAddon.fit());

        return () => {
            viewModel.stop();
        }
    });

    return (
        <XTerm options={{ disableStdin: true, fontSize: 12 }}
            className={styles.terminal}
            ref={xtermRef}
            addons={[fitAddon]} />
    );
});
