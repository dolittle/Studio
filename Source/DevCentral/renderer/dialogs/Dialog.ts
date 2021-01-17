// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const ipcRenderer = window.require('electron').ipcRenderer;

export class Dialog {
    static async showOpenDialog(): Promise<string> {
        return new Promise(resolve => {
            ipcRenderer.send('open-directory');

            ipcRenderer.on('directory-opened', (event, message) => {
                resolve(message);
            });
        });
    }
}