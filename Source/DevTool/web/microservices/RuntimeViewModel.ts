// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Terminal } from 'xterm';

export class RuntimeViewModel {

    terminalReady(terminal: Terminal) {
        terminal.clear();
        terminal.writeln('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    }
}